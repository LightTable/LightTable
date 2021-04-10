/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides a base class for custom Error objects such that the
 * stack is correctly maintained.
 *
 * You should never need to throw DebugError(msg) directly, Error(msg) is
 * sufficient.
 */

goog.module('goog.debug.Error');
goog.module.declareLegacyNamespace();



/**
 * Base class for custom error objects.
 * @param {*=} opt_msg The message associated with the error.
 * @constructor
 * @extends {Error}
 */
function DebugError(opt_msg) {
  // Attempt to ensure there is a stack trace.
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, DebugError);
  } else {
    const stack = new Error().stack;
    if (stack) {
      /** @override */
      this.stack = stack;
    }
  }

  if (opt_msg) {
    /** @override */
    this.message = String(opt_msg);
  }

  /**
   * Whether to report this error to the server. Setting this to false will
   * cause the error reporter to not report the error back to the server,
   * which can be useful if the client knows that the error has already been
   * logged on the server.
   * @type {boolean}
   */
  this.reportErrorToServer = true;
}
goog.inherits(DebugError, Error);


/** @override */
DebugError.prototype.name = 'CustomError';


exports = DebugError;
