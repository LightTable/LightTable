/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Browser capability checks for the events package.
 */

goog.module('goog.events.BrowserFeature');
goog.module.declareLegacyNamespace();

const googUserAgent = goog.require('goog.userAgent');


/**
 * Tricks Closure Compiler into believing that a function is pure.  The compiler
 * assumes that any `valueOf` function is pure, without analyzing its contents.
 *
 * @param {function(): T} fn
 * @return {T}
 * @template T
 */
const purify = (fn) => {
  return ({valueOf: fn}).valueOf();
};


/**
 * Enum of browser capabilities.
 * @enum {boolean}
 */
exports = {
  /**
   * Whether the button attribute of the event is W3C compliant.  False in
   * Internet Explorer prior to version 9; document-version dependent.
   */
  HAS_W3C_BUTTON: !googUserAgent.IE || googUserAgent.isDocumentModeOrHigher(9),

  /**
   * Whether the browser supports full W3C event model.
   */
  HAS_W3C_EVENT_SUPPORT:
      !googUserAgent.IE || googUserAgent.isDocumentModeOrHigher(9),

  /**
   * To prevent default in IE7-8 for certain keydown events we need set the
   * keyCode to -1.
   */
  SET_KEY_CODE_TO_PREVENT_DEFAULT:
      googUserAgent.IE && !googUserAgent.isVersionOrHigher('9'),

  /**
   * Whether the `navigator.onLine` property is supported.
   */
  HAS_NAVIGATOR_ONLINE_PROPERTY:
      !googUserAgent.WEBKIT || googUserAgent.isVersionOrHigher('528'),

  /**
   * Whether HTML5 network online/offline events are supported.
   */
  HAS_HTML5_NETWORK_EVENT_SUPPORT:
      googUserAgent.GECKO && googUserAgent.isVersionOrHigher('1.9b') ||
      googUserAgent.IE && googUserAgent.isVersionOrHigher('8') ||
      googUserAgent.OPERA && googUserAgent.isVersionOrHigher('9.5') ||
      googUserAgent.WEBKIT && googUserAgent.isVersionOrHigher('528'),

  /**
   * Whether HTML5 network events fire on document.body, or otherwise the
   * window.
   */
  HTML5_NETWORK_EVENTS_FIRE_ON_BODY:
      googUserAgent.GECKO && !googUserAgent.isVersionOrHigher('8') ||
      googUserAgent.IE && !googUserAgent.isVersionOrHigher('9'),

  /**
   * Whether touch is enabled in the browser.
   */
  TOUCH_ENABLED:
      ('ontouchstart' in goog.global ||
       !!(goog.global['document'] && document.documentElement &&
          'ontouchstart' in document.documentElement) ||
       // IE10 uses non-standard touch events, so it has a different check.
       !!(goog.global['navigator'] &&
          (goog.global['navigator']['maxTouchPoints'] ||
           goog.global['navigator']['msMaxTouchPoints']))),

  /**
   * Whether addEventListener supports W3C standard pointer events.
   * http://www.w3.org/TR/pointerevents/
   */
  POINTER_EVENTS: ('PointerEvent' in goog.global),

  /**
   * Whether addEventListener supports MSPointer events (only used in IE10).
   * http://msdn.microsoft.com/en-us/library/ie/hh772103(v=vs.85).aspx
   * http://msdn.microsoft.com/library/hh673557(v=vs.85).aspx
   */
  MSPOINTER_EVENTS:
      ('MSPointerEvent' in goog.global &&
       !!(goog.global['navigator'] &&
          goog.global['navigator']['msPointerEnabled'])),

  /**
   * Whether addEventListener supports {passive: true}.
   * https://developers.google.com/web/updates/2016/06/passive-event-listeners
   */
  PASSIVE_EVENTS: purify(function() {
    // If we're in a web worker or other custom environment, we can't tell.
    if (!goog.global.addEventListener || !Object.defineProperty) {  // IE 8
      return false;
    }

    var passive = false;
    var options = Object.defineProperty({}, 'passive', {
      get: function() {
        passive = true;
      }
    });
    try {
      goog.global.addEventListener('test', goog.nullFunction, options);
      goog.global.removeEventListener('test', goog.nullFunction, options);
    } catch (e) {
    }

    return passive;
  })
};
