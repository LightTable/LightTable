// Copyright 2013 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Provides a function to schedule running a function as soon
 * as possible after the current JS execution stops and yields to the event
 * loop.
 *
 */

goog.provide('goog.async.nextTick');
goog.provide('goog.async.throwException');

goog.require('goog.debug.entryPointRegistry');
goog.require('goog.dom.TagName');
goog.require('goog.functions');
goog.require('goog.labs.userAgent.browser');
goog.require('goog.labs.userAgent.engine');


/**
 * Throw an item without interrupting the current execution context.  For
 * example, if processing a group of items in a loop, sometimes it is useful
 * to report an error while still allowing the rest of the batch to be
 * processed.
 * @param {*} exception
 */
goog.async.throwException = function(exception) {
  // Each throw needs to be in its own context.
  goog.global.setTimeout(function() { throw exception; }, 0);
};


/**
 * Fires the provided callbacks as soon as possible after the current JS
 * execution context. setTimeout(…, 0) takes at least 4ms when called from
 * within another setTimeout(…, 0) for legacy reasons.
 *
 * This will not schedule the callback as a microtask (i.e. a task that can
 * preempt user input or networking callbacks). It is meant to emulate what
 * setTimeout(_, 0) would do if it were not throttled. If you desire microtask
 * behavior, use {@see goog.Promise} instead.
 *
 * @param {function(this:SCOPE)} callback Callback function to fire as soon as
 *     possible.
 * @param {SCOPE=} opt_context Object in whose scope to call the listener.
 * @param {boolean=} opt_useSetImmediate Avoid the IE workaround that
 *     ensures correctness at the cost of speed. See comments for details.
 * @template SCOPE
 */
goog.async.nextTick = function(callback, opt_context, opt_useSetImmediate) {
  var cb = callback;
  if (opt_context) {
    cb = goog.bind(callback, opt_context);
  }
  cb = goog.async.nextTick.wrapCallback_(cb);
  // Note we do allow callers to also request setImmediate if they are willing
  // to accept the possible tradeoffs of incorrectness in exchange for speed.
  // The IE fallback of readystate change is much slower. See useSetImmediate_
  // for details.
  if (goog.isFunction(goog.global.setImmediate) &&
      (opt_useSetImmediate || goog.async.nextTick.useSetImmediate_())) {
    goog.global.setImmediate(cb);
    return;
  }

  // Look for and cache the custom fallback version of setImmediate.
  if (!goog.async.nextTick.setImmediate_) {
    goog.async.nextTick.setImmediate_ =
        goog.async.nextTick.getSetImmediateEmulator_();
  }
  goog.async.nextTick.setImmediate_(cb);
};


/**
 * Returns whether should use setImmediate implementation currently on window.
 *
 * window.setImmediate was introduced and currently only supported by IE10+,
 * but due to a bug in the implementation it is not guaranteed that
 * setImmediate is faster than setTimeout nor that setImmediate N is before
 * setImmediate N+1. That is why we do not use the native version if
 * available. We do, however, call setImmediate if it is a non-native function
 * because that indicates that it has been replaced by goog.testing.MockClock
 * which we do want to support.
 * See
 * http://connect.microsoft.com/IE/feedback/details/801823/setimmediate-and-messagechannel-are-broken-in-ie10
 *
 * @return {boolean} Whether to use the implementation of setImmediate defined
 *     on Window.
 * @private
 */
goog.async.nextTick.useSetImmediate_ = function() {
  // Not a browser environment.
  if (!goog.global.Window || !goog.global.Window.prototype) {
    return true;
  }

  // MS Edge has window.setImmediate natively, but it's not on Window.prototype.
  // Also, there's no clean way to detect if the goog.global.setImmediate has
  // been replaced by mockClock as its replacement also shows up as "[native
  // code]" when using toString. Therefore, just always use
  // goog.global.setImmediate for Edge. It's unclear if it suffers the same
  // issues as IE10/11, but based on
  // https://dev.modern.ie/testdrive/demos/setimmediatesorting/
  // it seems they've been working to ensure it's WAI.
  if (goog.labs.userAgent.browser.isEdge() ||
      goog.global.Window.prototype.setImmediate != goog.global.setImmediate) {
    // Something redefined setImmediate in which case we decide to use it (This
    // is so that we use the mockClock setImmediate).
    return true;
  }

  return false;
};


/**
 * Cache for the setImmediate implementation.
 * @type {function(function())}
 * @private
 */
goog.async.nextTick.setImmediate_;


/**
 * Determines the best possible implementation to run a function as soon as
 * the JS event loop is idle.
 * @return {function(function())} The "setImmediate" implementation.
 * @private
 */
goog.async.nextTick.getSetImmediateEmulator_ = function() {
  // Create a private message channel and use it to postMessage empty messages
  // to ourselves.
  var Channel = goog.global['MessageChannel'];
  // If MessageChannel is not available and we are in a browser, implement
  // an iframe based polyfill in browsers that have postMessage and
  // document.addEventListener. The latter excludes IE8 because it has a
  // synchronous postMessage implementation.
  if (typeof Channel === 'undefined' && typeof window !== 'undefined' &&
      window.postMessage && window.addEventListener &&
      // Presto (The old pre-blink Opera engine) has problems with iframes
      // and contentWindow.
      !goog.labs.userAgent.engine.isPresto()) {
    /** @constructor */
    Channel = function() {
      // Make an empty, invisible iframe.
      var iframe = /** @type {!HTMLIFrameElement} */ (
          document.createElement(goog.dom.TagName.IFRAME));
      iframe.style.display = 'none';
      iframe.src = '';
      document.documentElement.appendChild(iframe);
      var win = iframe.contentWindow;
      var doc = win.document;
      doc.open();
      doc.write('');
      doc.close();
      // Do not post anything sensitive over this channel, as the workaround for
      // pages with file: origin could allow that information to be modified or
      // intercepted.
      var message = 'callImmediate' + Math.random();
      // The same origin policy rejects attempts to postMessage from file: urls
      // unless the origin is '*'.
      // TODO(b/16335441): Use '*' origin for data: and other similar protocols.
      var origin = win.location.protocol == 'file:' ?
          '*' :
          win.location.protocol + '//' + win.location.host;
      var onmessage = goog.bind(function(e) {
        // Validate origin and message to make sure that this message was
        // intended for us. If the origin is set to '*' (see above) only the
        // message needs to match since, for example, '*' != 'file://'. Allowing
        // the wildcard is ok, as we are not concerned with security here.
        if ((origin != '*' && e.origin != origin) || e.data != message) {
          return;
        }
        this['port1'].onmessage();
      }, this);
      win.addEventListener('message', onmessage, false);
      this['port1'] = {};
      this['port2'] = {
        postMessage: function() { win.postMessage(message, origin); }
      };
    };
  }
  if (typeof Channel !== 'undefined' && (!goog.labs.userAgent.browser.isIE())) {
    // Exclude all of IE due to
    // http://codeforhire.com/2013/09/21/setimmediate-and-messagechannel-broken-on-internet-explorer-10/
    // which allows starving postMessage with a busy setTimeout loop.
    // This currently affects IE10 and IE11 which would otherwise be able
    // to use the postMessage based fallbacks.
    var channel = new Channel();
    // Use a fifo linked list to call callbacks in the right order.
    var head = {};
    var tail = head;
    channel['port1'].onmessage = function() {
      if (goog.isDef(head.next)) {
        head = head.next;
        var cb = head.cb;
        head.cb = null;
        cb();
      }
    };
    return function(cb) {
      tail.next = {cb: cb};
      tail = tail.next;
      channel['port2'].postMessage(0);
    };
  }
  // Implementation for IE6 to IE10: Script elements fire an asynchronous
  // onreadystatechange event when inserted into the DOM.
  if (typeof document !== 'undefined' &&
      'onreadystatechange' in document.createElement(goog.dom.TagName.SCRIPT)) {
    return function(cb) {
      var script = document.createElement(goog.dom.TagName.SCRIPT);
      script.onreadystatechange = function() {
        // Clean up and call the callback.
        script.onreadystatechange = null;
        script.parentNode.removeChild(script);
        script = null;
        cb();
        cb = null;
      };
      document.documentElement.appendChild(script);
    };
  }
  // Fall back to setTimeout with 0. In browsers this creates a delay of 5ms
  // or more.
  // NOTE(user): This fallback is used for IE11.
  return function(cb) { goog.global.setTimeout(cb, 0); };
};


/**
 * Helper function that is overrided to protect callbacks with entry point
 * monitor if the application monitors entry points.
 * @param {function()} callback Callback function to fire as soon as possible.
 * @return {function()} The wrapped callback.
 * @private
 */
goog.async.nextTick.wrapCallback_ = goog.functions.identity;


// Register the callback function as an entry point, so that it can be
// monitored for exception handling, etc. This has to be done in this file
// since it requires special code to handle all browsers.
goog.debug.entryPointRegistry.register(
    /**
     * @param {function(!Function): !Function} transformer The transforming
     *     function.
     */
    function(transformer) { goog.async.nextTick.wrapCallback_ = transformer; });
