/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Closure user agent detection.
 * @see http://en.wikipedia.org/wiki/User_agent
 * For more information on browser brand, platform, or device see the other
 * sub-namespaces in goog.labs.userAgent (browser, platform, and device).
 */

goog.provide('goog.labs.userAgent.engine');

goog.require('goog.array');
goog.require('goog.labs.userAgent.util');
goog.require('goog.string');


/**
 * @return {boolean} Whether the rendering engine is Presto.
 */
goog.labs.userAgent.engine.isPresto = function() {
  'use strict';
  return goog.labs.userAgent.util.matchUserAgent('Presto');
};


/**
 * @return {boolean} Whether the rendering engine is Trident.
 */
goog.labs.userAgent.engine.isTrident = function() {
  'use strict';
  // IE only started including the Trident token in IE8.
  return goog.labs.userAgent.util.matchUserAgent('Trident') ||
      goog.labs.userAgent.util.matchUserAgent('MSIE');
};


/**
 * @return {boolean} Whether the rendering engine is EdgeHTML.
 */
goog.labs.userAgent.engine.isEdge = function() {
  'use strict';
  return goog.labs.userAgent.util.matchUserAgent('Edge');
};


/**
 * @return {boolean} Whether the rendering engine is WebKit. This will return
 * true for Chrome, Blink-based Opera (15+), Edge Chromium and Safari.
 */
goog.labs.userAgent.engine.isWebKit = function() {
  'use strict';
  return goog.labs.userAgent.util.matchUserAgentIgnoreCase('WebKit') &&
      !goog.labs.userAgent.engine.isEdge();
};


/**
 * @return {boolean} Whether the rendering engine is Gecko.
 */
goog.labs.userAgent.engine.isGecko = function() {
  'use strict';
  return goog.labs.userAgent.util.matchUserAgent('Gecko') &&
      !goog.labs.userAgent.engine.isWebKit() &&
      !goog.labs.userAgent.engine.isTrident() &&
      !goog.labs.userAgent.engine.isEdge();
};


/**
 * @return {string} The rendering engine's version or empty string if version
 *     can't be determined.
 */
goog.labs.userAgent.engine.getVersion = function() {
  'use strict';
  var userAgentString = goog.labs.userAgent.util.getUserAgent();
  if (userAgentString) {
    var tuples = goog.labs.userAgent.util.extractVersionTuples(userAgentString);

    var engineTuple = goog.labs.userAgent.engine.getEngineTuple_(tuples);
    if (engineTuple) {
      // In Gecko, the version string is either in the browser info or the
      // Firefox version.  See Gecko user agent string reference:
      // http://goo.gl/mULqa
      if (engineTuple[0] == 'Gecko') {
        return goog.labs.userAgent.engine.getVersionForKey_(tuples, 'Firefox');
      }

      return engineTuple[1];
    }

    // MSIE has only one version identifier, and the Trident version is
    // specified in the parenthetical. IE Edge is covered in the engine tuple
    // detection.
    var browserTuple = tuples[0];
    var info;
    if (browserTuple && (info = browserTuple[2])) {
      var match = /Trident\/([^\s;]+)/.exec(info);
      if (match) {
        return match[1];
      }
    }
  }
  return '';
};


/**
 * @param {!Array<!Array<string>>} tuples Extracted version tuples.
 * @return {!Array<string>|undefined} The engine tuple or undefined if not
 *     found.
 * @private
 */
goog.labs.userAgent.engine.getEngineTuple_ = function(tuples) {
  'use strict';
  if (!goog.labs.userAgent.engine.isEdge()) {
    return tuples[1];
  }
  for (var i = 0; i < tuples.length; i++) {
    var tuple = tuples[i];
    if (tuple[0] == 'Edge') {
      return tuple;
    }
  }
};


/**
 * @param {string|number} version The version to check.
 * @return {boolean} Whether the rendering engine version is higher or the same
 *     as the given version.
 */
goog.labs.userAgent.engine.isVersionOrHigher = function(version) {
  'use strict';
  return goog.string.compareVersions(
             goog.labs.userAgent.engine.getVersion(), version) >= 0;
};


/**
 * @param {!Array<!Array<string>>} tuples Version tuples.
 * @param {string} key The key to look for.
 * @return {string} The version string of the given key, if present.
 *     Otherwise, the empty string.
 * @private
 */
goog.labs.userAgent.engine.getVersionForKey_ = function(tuples, key) {
  'use strict';
  // TODO(nnaze): Move to util if useful elsewhere.

  var pair = goog.array.find(tuples, function(pair) {
    'use strict';
    return key == pair[0];
  });

  return pair && pair[1] || '';
};
