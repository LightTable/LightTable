/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Closure user agent platform detection.
 * @see <a href="http://www.useragentstring.com/">User agent strings</a>
 * For more information on browser brand, rendering engine, or device see the
 * other sub-namespaces in goog.labs.userAgent (browser, engine, and device
 * respectively).
 */

goog.provide('goog.labs.userAgent.platform');

goog.require('goog.labs.userAgent.util');
goog.require('goog.string');


/**
 * @return {boolean} Whether the platform is Android.
 */
goog.labs.userAgent.platform.isAndroid = function() {
  'use strict';
  return goog.labs.userAgent.util.matchUserAgent('Android');
};


/**
 * @return {boolean} Whether the platform is iPod.
 */
goog.labs.userAgent.platform.isIpod = function() {
  'use strict';
  return goog.labs.userAgent.util.matchUserAgent('iPod');
};


/**
 * @return {boolean} Whether the platform is iPhone.
 */
goog.labs.userAgent.platform.isIphone = function() {
  'use strict';
  return goog.labs.userAgent.util.matchUserAgent('iPhone') &&
      !goog.labs.userAgent.util.matchUserAgent('iPod') &&
      !goog.labs.userAgent.util.matchUserAgent('iPad');
};


/**
 * @return {boolean} Whether the platform is iPad.
 */
goog.labs.userAgent.platform.isIpad = function() {
  'use strict';
  return goog.labs.userAgent.util.matchUserAgent('iPad');
};


/**
 * @return {boolean} Whether the platform is iOS.
 */
goog.labs.userAgent.platform.isIos = function() {
  'use strict';
  return goog.labs.userAgent.platform.isIphone() ||
      goog.labs.userAgent.platform.isIpad() ||
      goog.labs.userAgent.platform.isIpod();
};


/**
 * @return {boolean} Whether the platform is Mac.
 */
goog.labs.userAgent.platform.isMacintosh = function() {
  'use strict';
  return goog.labs.userAgent.util.matchUserAgent('Macintosh');
};


/**
 * Note: ChromeOS is not considered to be Linux as it does not report itself
 * as Linux in the user agent string.
 * @return {boolean} Whether the platform is Linux.
 */
goog.labs.userAgent.platform.isLinux = function() {
  'use strict';
  return goog.labs.userAgent.util.matchUserAgent('Linux');
};


/**
 * @return {boolean} Whether the platform is Windows.
 */
goog.labs.userAgent.platform.isWindows = function() {
  'use strict';
  return goog.labs.userAgent.util.matchUserAgent('Windows');
};


/**
 * @return {boolean} Whether the platform is ChromeOS.
 */
goog.labs.userAgent.platform.isChromeOS = function() {
  'use strict';
  return goog.labs.userAgent.util.matchUserAgent('CrOS');
};

/**
 * @return {boolean} Whether the platform is Chromecast.
 */
goog.labs.userAgent.platform.isChromecast = function() {
  'use strict';
  return goog.labs.userAgent.util.matchUserAgent('CrKey');
};

/**
 * @return {boolean} Whether the platform is KaiOS.
 */
goog.labs.userAgent.platform.isKaiOS = function() {
  'use strict';
  return goog.labs.userAgent.util.matchUserAgentIgnoreCase('KaiOS');
};

/**
 * The version of the platform. We only determine the version for Windows,
 * Mac, and Chrome OS. It doesn't make much sense on Linux. For Windows, we only
 * look at the NT version. Non-NT-based versions (e.g. 95, 98, etc.) are given
 * version 0.0.
 *
 * @return {string} The platform version or empty string if version cannot be
 *     determined.
 */
goog.labs.userAgent.platform.getVersion = function() {
  'use strict';
  var userAgentString = goog.labs.userAgent.util.getUserAgent();
  var version = '', re;
  if (goog.labs.userAgent.platform.isWindows()) {
    re = /Windows (?:NT|Phone) ([0-9.]+)/;
    var match = re.exec(userAgentString);
    if (match) {
      version = match[1];
    } else {
      version = '0.0';
    }
  } else if (goog.labs.userAgent.platform.isIos()) {
    re = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/;
    var match = re.exec(userAgentString);
    // Report the version as x.y.z and not x_y_z
    version = match && match[1].replace(/_/g, '.');
  } else if (goog.labs.userAgent.platform.isMacintosh()) {
    re = /Mac OS X ([0-9_.]+)/;
    var match = re.exec(userAgentString);
    // Note: some old versions of Camino do not report an OSX version.
    // Default to 10.
    version = match ? match[1].replace(/_/g, '.') : '10';
  } else if (goog.labs.userAgent.platform.isKaiOS()) {
    re = /(?:KaiOS)\/(\S+)/i;
    var match = re.exec(userAgentString);
    version = match && match[1];
  } else if (goog.labs.userAgent.platform.isAndroid()) {
    re = /Android\s+([^\);]+)(\)|;)/;
    var match = re.exec(userAgentString);
    version = match && match[1];
  } else if (goog.labs.userAgent.platform.isChromeOS()) {
    re = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/;
    var match = re.exec(userAgentString);
    version = match && match[1];
  }
  return version || '';
};


/**
 * @param {string|number} version The version to check.
 * @return {boolean} Whether the browser version is higher or the same as the
 *     given version.
 */
goog.labs.userAgent.platform.isVersionOrHigher = function(version) {
  'use strict';
  return goog.string.compareVersions(
             goog.labs.userAgent.platform.getVersion(), version) >= 0;
};
