// Copyright 2017 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.dom.asserts');

goog.require('goog.asserts');

/**
 * @fileoverview Custom assertions to ensure that an element has the appropriate
 * type.
 *
 * Using a goog.dom.safe wrapper on an object on the incorrect type (via an
 * incorrect static type cast) can result in security bugs: For instance,
 * g.d.s.setAnchorHref ensures that the URL assigned to the .href attribute
 * satisfies the SafeUrl contract, i.e., is safe to dereference as a hyperlink.
 * However, the value assigned to a HTMLLinkElement's .href property requires
 * the stronger TrustedResourceUrl contract, since it can refer to a stylesheet.
 * Thus, using g.d.s.setAnchorHref on an (incorrectly statically typed) object
 * of type HTMLLinkElement can result in a security vulnerability.
 * Assertions of the correct run-time type help prevent such incorrect use.
 *
 * In some cases, code using the DOM API is tested using mock objects (e.g., a
 * plain object such as {'href': url} instead of an actual Location object).
 * To allow such mocking, the assertions permit objects of types that are not
 * relevant DOM API objects at all (for instance, not Element or Location).
 *
 * Note that instanceof checks don't work straightforwardly in older versions of
 * IE, or across frames (see,
 * http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object,
 * http://stackoverflow.com/questions/26248599/instanceof-htmlelement-in-iframe-is-not-element-or-object).
 *
 * Hence, these assertions may pass vacuously in such scenarios. The resulting
 * risk of security bugs is limited by the following factors:
 *  - A bug can only arise in scenarios involving incorrect static typing (the
 *    wrapper methods are statically typed to demand objects of the appropriate,
 *    precise type).
 *  - Typically, code is tested and exercised in multiple browsers.
 */

/**
 * Asserts that a given object is a Location.
 *
 * To permit this assertion to pass in the context of tests where DOM APIs might
 * be mocked, also accepts any other type except for subtypes of {!Element}.
 * This is to ensure that, for instance, HTMLLinkElement is not being used in
 * place of a Location, since this could result in security bugs due to stronger
 * contracts required for assignments to the href property of the latter.
 *
 * @param {?Object} o The object whose type to assert.
 * @return {!Location}
 */
goog.dom.asserts.assertIsLocation = function(o) {
  if (goog.asserts.ENABLE_ASSERTS) {
    var win = goog.dom.asserts.getWindow_(o);
    if (typeof win.Location != 'undefined' &&
        typeof win.Element != 'undefined') {
      goog.asserts.assert(
          o && (o instanceof win.Location || !(o instanceof win.Element)),
          'Argument is not a Location (or a non-Element mock); got: %s',
          goog.dom.asserts.debugStringForType_(o));
    }
  }
  return /** @type {!Location} */ (o);
};

/**
 * Asserts that a given object is a HTMLAnchorElement.
 *
 * To permit this assertion to pass in the context of tests where elements might
 * be mocked, also accepts objects that are not of type Location nor a subtype
 * of Element.
 *
 * @param {?Object} o The object whose type to assert.
 * @return {!HTMLAnchorElement}
 */
goog.dom.asserts.assertIsHTMLAnchorElement = function(o) {
  if (goog.asserts.ENABLE_ASSERTS) {
    var win = goog.dom.asserts.getWindow_(o);
    if (typeof win.HTMLAnchorElement != 'undefined' &&
        typeof win.Location != 'undefined' &&
        typeof win.Element != 'undefined') {
      goog.asserts.assert(
          o &&
              (o instanceof win.HTMLAnchorElement ||
               !((o instanceof win.Location) || (o instanceof win.Element))),
          'Argument is not a HTMLAnchorElement (or a non-Element mock); ' +
              'got: %s',
          goog.dom.asserts.debugStringForType_(o));
    }
  }
  return /** @type {!HTMLAnchorElement} */ (o);
};

/**
 * Asserts that a given object is a HTMLLinkElement.
 *
 * To permit this assertion to pass in the context of tests where elements might
 * be mocked, also accepts objects that are not a subtype of Element.
 *
 * @param {?Object} o The object whose type to assert.
 * @return {!HTMLLinkElement}
 */
goog.dom.asserts.assertIsHTMLLinkElement = function(o) {
  if (goog.asserts.ENABLE_ASSERTS) {
    var win = goog.dom.asserts.getWindow_(o);
    if (typeof win.HTMLLinkElement != 'undefined' &&
        typeof win.Location != 'undefined' &&
        typeof win.Element != 'undefined') {
      goog.asserts.assert(
          o &&
              (o instanceof win.HTMLLinkElement ||
               !((o instanceof win.Location) || (o instanceof win.Element))),
          'Argument is not a HTMLLinkElement (or a non-Element mock); got: %s',
          goog.dom.asserts.debugStringForType_(o));
    }
  }
  return /** @type {!HTMLLinkElement} */ (o);
};

/**
 * Asserts that a given object is a HTMLImageElement.
 *
 * To permit this assertion to pass in the context of tests where elements might
 * be mocked, also accepts objects that are not a subtype of Element.
 *
 * @param {?Object} o The object whose type to assert.
 * @return {!HTMLImageElement}
 */
goog.dom.asserts.assertIsHTMLImageElement = function(o) {
  if (goog.asserts.ENABLE_ASSERTS) {
    var win = goog.dom.asserts.getWindow_(o);
    if (typeof win.HTMLImageElement != 'undefined' &&
        typeof win.Element != 'undefined') {
      goog.asserts.assert(
          o &&
              (o instanceof win.HTMLImageElement ||
               !(o instanceof win.Element)),
          'Argument is not a HTMLImageElement (or a non-Element mock); got: %s',
          goog.dom.asserts.debugStringForType_(o));
    }
  }
  return /** @type {!HTMLImageElement} */ (o);
};

/**
 * Asserts that a given object is a HTMLEmbedElement.
 *
 * To permit this assertion to pass in the context of tests where elements might
 * be mocked, also accepts objects that are not a subtype of Element.
 *
 * @param {?Object} o The object whose type to assert.
 * @return {!HTMLEmbedElement}
 */
goog.dom.asserts.assertIsHTMLEmbedElement = function(o) {
  if (goog.asserts.ENABLE_ASSERTS) {
    var win = goog.dom.asserts.getWindow_(o);
    if (typeof win.HTMLEmbedElement != 'undefined' &&
        typeof win.Element != 'undefined') {
      goog.asserts.assert(
          o &&
              (o instanceof win.HTMLEmbedElement ||
               !(o instanceof win.Element)),
          'Argument is not a HTMLEmbedElement (or a non-Element mock); got: %s',
          goog.dom.asserts.debugStringForType_(o));
    }
  }
  return /** @type {!HTMLEmbedElement} */ (o);
};

/**
 * Asserts that a given object is a HTMLFrameElement.
 *
 * To permit this assertion to pass in the context of tests where elements might
 * be mocked, also accepts objects that are not a subtype of Element.
 *
 * @param {?Object} o The object whose type to assert.
 * @return {!HTMLFrameElement}
 */
goog.dom.asserts.assertIsHTMLFrameElement = function(o) {
  if (goog.asserts.ENABLE_ASSERTS) {
    var win = goog.dom.asserts.getWindow_(o);
    if (typeof win.HTMLFrameElement != 'undefined' &&
        typeof win.Element != 'undefined') {
      goog.asserts.assert(
          o &&
              (o instanceof win.HTMLFrameElement ||
               !(o instanceof win.Element)),
          'Argument is not a HTMLFrameElement (or a non-Element mock); got: %s',
          goog.dom.asserts.debugStringForType_(o));
    }
  }
  return /** @type {!HTMLFrameElement} */ (o);
};

/**
 * Asserts that a given object is a HTMLIFrameElement.
 *
 * To permit this assertion to pass in the context of tests where elements might
 * be mocked, also accepts objects that are not a subtype of Element.
 *
 * @param {?Object} o The object whose type to assert.
 * @return {!HTMLIFrameElement}
 */
goog.dom.asserts.assertIsHTMLIFrameElement = function(o) {
  if (goog.asserts.ENABLE_ASSERTS) {
    var win = goog.dom.asserts.getWindow_(o);
    if (typeof win.HTMLIFrameElement != 'undefined' &&
        typeof win.Element != 'undefined') {
      goog.asserts.assert(
          o &&
              (o instanceof win.HTMLIFrameElement ||
               !(o instanceof win.Element)),
          'Argument is not a HTMLIFrameElement (or a non-Element mock); ' +
              'got: %s',
          goog.dom.asserts.debugStringForType_(o));
    }
  }
  return /** @type {!HTMLIFrameElement} */ (o);
};

/**
 * Asserts that a given object is a HTMLObjectElement.
 *
 * To permit this assertion to pass in the context of tests where elements might
 * be mocked, also accepts objects that are not a subtype of Element.
 *
 * @param {?Object} o The object whose type to assert.
 * @return {!HTMLObjectElement}
 */
goog.dom.asserts.assertIsHTMLObjectElement = function(o) {
  if (goog.asserts.ENABLE_ASSERTS) {
    var win = goog.dom.asserts.getWindow_(o);
    if (typeof win.HTMLObjectElement != 'undefined' &&
        typeof win.Element != 'undefined') {
      goog.asserts.assert(
          o &&
              (o instanceof win.HTMLObjectElement ||
               !(o instanceof win.Element)),
          'Argument is not a HTMLObjectElement (or a non-Element mock); ' +
              'got: %s',
          goog.dom.asserts.debugStringForType_(o));
    }
  }
  return /** @type {!HTMLObjectElement} */ (o);
};

/**
 * Asserts that a given object is a HTMLScriptElement.
 *
 * To permit this assertion to pass in the context of tests where elements might
 * be mocked, also accepts objects that are not a subtype of Element.
 *
 * @param {?Object} o The object whose type to assert.
 * @return {!HTMLScriptElement}
 */
goog.dom.asserts.assertIsHTMLScriptElement = function(o) {
  if (goog.asserts.ENABLE_ASSERTS) {
    var win = goog.dom.asserts.getWindow_(o);
    if (typeof win.HTMLScriptElement != 'undefined' &&
        typeof win.Element != 'undefined') {
      goog.asserts.assert(
          o &&
              (o instanceof win.HTMLScriptElement ||
               !(o instanceof win.Element)),
          'Argument is not a HTMLScriptElement (or a non-Element mock); ' +
              'got: %s',
          goog.dom.asserts.debugStringForType_(o));
    }
  }
  return /** @type {!HTMLScriptElement} */ (o);
};

/**
 * Returns a string representation of a value's type.
 *
 * @param {*} value An object, or primitive.
 * @return {string} The best display name for the value.
 * @private
 */
goog.dom.asserts.debugStringForType_ = function(value) {
  if (goog.isObject(value)) {
    return value.constructor.displayName || value.constructor.name ||
        Object.prototype.toString.call(value);
  } else {
    return value === undefined ? 'undefined' :
                                 value === null ? 'null' : typeof value;
  }
};

/**
 * Gets window of element.
 * @param {?Object} o
 * @return {!Window}
 * @private
 */
goog.dom.asserts.getWindow_ = function(o) {
  var doc = o && o.ownerDocument;
  var win = doc && /** @type {?Window} */ (doc.defaultView || doc.parentWindow);
  return win || /** @type {!Window} */ (goog.global);
};
