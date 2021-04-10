/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of the Logger class. Please minimize dependencies
 * this file has on other closure classes as any dependency it takes won't be
 * able to use the logging infrastructure.
 *
 * @see ../demos/debug.html
 */

goog.provide('goog.debug.LogManager');
goog.provide('goog.debug.Loggable');
goog.provide('goog.debug.Logger');
goog.provide('goog.debug.Logger.Level');

goog.require('goog.debug');
goog.require('goog.log');
goog.require('goog.log.Level');
goog.require('goog.log.LogRecord');
goog.require('goog.log.Logger');


/**
 * A message value that can be handled by a Logger.
 *
 * Functions are treated like callbacks, but are only called when the event's
 * log level is enabled. This is useful for logging messages that are expensive
 * to construct.
 * @deprecated Use {@link goog.log.Loggable} instead.
 *
 * @typedef {string|function(): string}
 */
goog.debug.Loggable;



/**
 * The Logger is an object used for logging debug messages. Loggers are
 * normally named, using a hierarchical dot-separated namespace. Logger names
 * can be arbitrary strings, but they should normally be based on the package
 * name or class name of the logged component, such as goog.net.BrowserChannel.
 *
 * The Logger object is loosely based on the java class
 * java.util.logging.Logger. It supports different levels of filtering for
 * different loggers.
 * @deprecated Use {@link goog.log} instead.
 *
 * @implements {goog.log.Logger}
 * @final
 */
goog.debug.Logger = class {
  /**
   * Construct a new Logger.
   *
   * Users should not construct their own instances of goog.debug.Logger. They
   * should always use the {@link goog.log.getLogger} function.
   *
   * @param {string} name The name of the Logger.
   */
  constructor(name) {
    /**
     * @type {string}
     * @private
     */
    this.name_ = name;
  }

  /**
   * @return {string}
   * @override
   */
  getName() {
    return this.name_;
  }

  /**
   * Adds a handler to the logger. This doesn't use the event system because
   * we want to be able to add logging to the event system.
   * @param {Function} handler Handler function to add.
   */
  addHandler(handler) {
    goog.log.addHandler(
        this, /** @type {!goog.log.LogRecordHandler} */ (handler));
  }

  /**
   * Removes a handler from the logger. This doesn't use the event system
   * because we want to be able to add logging to the event system.
   * @param {Function} handler Handler function to remove.
   * @return {boolean} Whether the handler was removed.
   */
  removeHandler(handler) {
    return goog.log.removeHandler(
        this, /** @type {!goog.log.LogRecordHandler} */ (handler));
  }

  /**
   * Set the log level specifying which message levels will be logged by this
   * logger. Message levels lower than this value will be discarded.
   * The level value Level.OFF can be used to turn off logging. If the new level
   * is null, it means that this node should inherit its level from its nearest
   * ancestor with a specific (non-null) level value.
   *
   * @param {!goog.log.Level|null} level The new level.
   */
  setLevel(level) {
    goog.log.setLevel(this, level);
  }

  /**
   * Gets the log level specifying which message levels will be logged by this
   * logger. Message levels lower than this value will be discarded.
   * The level value Level.OFF can be used to turn off logging. If the level
   * is null, it means that this node should inherit its level from its nearest
   * ancestor with a specific (non-null) level value.
   *
   * @return {!goog.log.Level|null} The level.
   */
  getLevel() {
    return goog.log.getLevel(this);
  }

  /**
   * Returns the effective level of the logger based on its ancestors' levels.
   * @return {!goog.log.Level} The level.
   */
  getEffectiveLevel() {
    return goog.log.getEffectiveLevel(this);
  }

  /**
   * Checks if a message of the given level would actually be logged by this
   * logger. This check is based on the Loggers effective level, which may be
   * inherited from its parent.
   * @param {!goog.log.Level} level The level to check.
   * @return {boolean} Whether the message would be logged.
   */
  isLoggable(level) {
    const googLogLevel = goog.log.Level[level.toString()];
    return goog.log.isLoggable(this, googLogLevel);
  }

  /**
   * Logs a message. If the logger is currently enabled for the
   * given message level then the given message is forwarded to all the
   * registered output Handler objects.
   * @param {!goog.log.Level} level One of the level identifiers.
   * @param {goog.debug.Loggable} msg The message to log.
   * @param {Error|Object=} opt_exception An exception associated with the
   *     message.
   */
  log(level, msg, opt_exception) {
    goog.log.log(this, level, msg, opt_exception);
  }

  /**
   * Creates a new log record and adds the exception (if present) to it.
   * @param {!goog.log.Level} level One of the level identifiers.
   * @param {string} msg The string message.
   * @param {Error|Object=} opt_exception An exception associated with the
   *     message.
   * @return {!goog.log.LogRecord} A log record.
   */
  getLogRecord(level, msg, opt_exception) {
    return goog.log.getLogRecord(this, level, msg, opt_exception);
  }

  /**
   * Logs a message at the Logger.Level.SHOUT level.
   * If the logger is currently enabled for the given message level then the
   * given message is forwarded to all the registered output Handler objects.
   * @param {goog.debug.Loggable} msg The message to log.
   * @param {Error=} opt_exception An exception associated with the message.
   */
  shout(msg, opt_exception) {
    if (goog.debug.LOGGING_ENABLED) {
      this.log(goog.debug.Logger.Level.SHOUT, msg, opt_exception);
    }
  }

  /**
   * Logs a message at the Logger.Level.SEVERE level.
   * If the logger is currently enabled for the given message level then the
   * given message is forwarded to all the registered output Handler objects.
   * @param {goog.debug.Loggable} msg The message to log.
   * @param {Error=} opt_exception An exception associated with the message.
   */
  severe(msg, opt_exception) {
    if (goog.debug.LOGGING_ENABLED) {
      this.log(goog.debug.Logger.Level.SEVERE, msg, opt_exception);
    }
  }

  /**
   * Logs a message at the Logger.Level.WARNING level.
   * If the logger is currently enabled for the given message level then the
   * given message is forwarded to all the registered output Handler objects.
   * @param {goog.debug.Loggable} msg The message to log.
   * @param {Error=} opt_exception An exception associated with the message.
   */
  warning(msg, opt_exception) {
    if (goog.debug.LOGGING_ENABLED) {
      this.log(goog.debug.Logger.Level.WARNING, msg, opt_exception);
    }
  }

  /**
   * Logs a message at the Logger.Level.INFO level.
   * If the logger is currently enabled for the given message level then the
   * given message is forwarded to all the registered output Handler objects.
   * @param {goog.debug.Loggable} msg The message to log.
   * @param {Error=} opt_exception An exception associated with the message.
   */
  info(msg, opt_exception) {
    if (goog.debug.LOGGING_ENABLED) {
      this.log(goog.debug.Logger.Level.INFO, msg, opt_exception);
    }
  };


  /**
   * Logs a message at the Logger.Level.CONFIG level.
   * If the logger is currently enabled for the given message level then the
   * given message is forwarded to all the registered output Handler objects.
   * @param {goog.debug.Loggable} msg The message to log.
   * @param {Error=} opt_exception An exception associated with the message.
   */
  config(msg, opt_exception) {
    if (goog.debug.LOGGING_ENABLED) {
      this.log(goog.debug.Logger.Level.CONFIG, msg, opt_exception);
    }
  };


  /**
   * Logs a message at the Logger.Level.FINE level.
   * If the logger is currently enabled for the given message level then the
   * given message is forwarded to all the registered output Handler objects.
   * @param {goog.debug.Loggable} msg The message to log.
   * @param {Error=} opt_exception An exception associated with the message.
   */
  fine(msg, opt_exception) {
    if (goog.debug.LOGGING_ENABLED) {
      this.log(goog.debug.Logger.Level.FINE, msg, opt_exception);
    }
  }

  /**
   * Logs a message at the Logger.Level.FINER level.
   * If the logger is currently enabled for the given message level then the
   * given message is forwarded to all the registered output Handler objects.
   * @param {goog.debug.Loggable} msg The message to log.
   * @param {Error=} opt_exception An exception associated with the message.
   */
  finer(msg, opt_exception) {
    if (goog.debug.LOGGING_ENABLED) {
      this.log(goog.debug.Logger.Level.FINER, msg, opt_exception);
    }
  }

  /**
   * Logs a message at the Logger.Level.FINEST level.
   * If the logger is currently enabled for the given message level then the
   * given message is forwarded to all the registered output Handler objects.
   * @param {goog.debug.Loggable} msg The message to log.
   * @param {Error=} opt_exception An exception associated with the message.
   */
  finest(msg, opt_exception) {
    if (goog.debug.LOGGING_ENABLED) {
      this.log(goog.debug.Logger.Level.FINEST, msg, opt_exception);
    }
  }

  /**
   * Logs a LogRecord. If the logger is currently enabled for the
   * given message level then the given message is forwarded to all the
   * registered output Handler objects.
   * @param {!goog.log.LogRecord} logRecord A log record to log.
   */
  logRecord(logRecord) {
    goog.log.publishLogRecord(this, logRecord);
  }
};


/**
 * @deprecated Use {@link goog.log.Level} instead.
 * @constructor
 * @final
 */
goog.debug.Logger.Level = goog.log.Level;


/**
 * @deprecated Use {@link goog.log.ROOT_LOGGER_NAME} instead.
 * @const
 */
goog.debug.Logger.ROOT_LOGGER_NAME = '';


/**
 * @define {boolean} Toggles whether loggers other than the root logger can have
 *     log handlers attached to them and whether they can have their log level
 *     set. Logging is a bit faster when this is set to false.
 */
goog.debug.Logger.ENABLE_HIERARCHY =
    goog.define('goog.debug.Logger.ENABLE_HIERARCHY', true);


/**
 * @define {boolean} Toggles whether active log statements are also recorded
 *     to the profiler.
 */
goog.debug.Logger.ENABLE_PROFILER_LOGGING =
    goog.define('goog.debug.Logger.ENABLE_PROFILER_LOGGING', false);


/**
 * Finds or creates a logger for a named subsystem. If a logger has already been
 * created with the given name it is returned. Otherwise a new logger is
 * created. If a new logger is created its log level will be configured based
 * on the LogManager configuration and it will configured to also send logging
 * output to its parent's handlers. It will be registered in the LogManager
 * global namespace.
 *
 * @param {string} name A name for the logger. This should be a dot-separated
 * name and should normally be based on the package name or class name of the
 * subsystem, such as goog.net.BrowserChannel.
 * @return {!goog.debug.Logger} The named logger.
 * @deprecated Use {@link goog.log.getLogger} instead.
 */
goog.debug.Logger.getLogger = function(name) {
  'use strict';
  return goog.debug.LogManager.getLogger(name);
};


/**
 * Logs a message to profiling tools, if available.
 * {@see https://developers.google.com/web-toolkit/speedtracer/logging-api}
 * {@see http://msdn.microsoft.com/en-us/library/dd433074(VS.85).aspx}
 * @param {string} msg The message to log.
 */
goog.debug.Logger.logToProfilers = function(msg) {
  'use strict';
  // Some browsers also log timeStamp calls to the console, only log
  // if actually asked.
  if (goog.debug.Logger.ENABLE_PROFILER_LOGGING) {
    var msWriteProfilerMark = goog.global['msWriteProfilerMark'];
    if (msWriteProfilerMark) {
      // Logs a message to the Microsoft profiler
      // On IE, console['timeStamp'] may output to console
      msWriteProfilerMark(msg);
      return;
    }

    // Using goog.global, as loggers might be used in window-less contexts.
    var console = goog.global['console'];
    if (console && console['timeStamp']) {
      // Logs a message to Firebug, Web Inspector, SpeedTracer, etc.
      console['timeStamp'](msg);
    }
  }
};


/**
 * There is a single global LogManager object that is used to maintain a set of
 * shared state about Loggers and log services. This is loosely based on the
 * java class java.util.logging.LogManager.
 * @const
 */
goog.debug.LogManager = {};


/**
 * Map of logger names to logger objects.
 *
 * @type {!Object<string, !goog.debug.Logger>}
 * @private
 */
goog.debug.LogManager.loggers_ = {};


/**
 * The root logger which is the root of the logger tree.
 * @type {?goog.debug.Logger}
 * @private
 */
goog.debug.LogManager.rootLogger_ = null;


/**
 * Initializes the LogManager if not already initialized.
 * @deprecated LogManager is automatically initialized when getRoot or getLogger
 * is called, and both of those methods are deprecated.
 */
goog.debug.LogManager.initialize = function() {
  'use strict';
  if (!goog.debug.LogManager.rootLogger_) {
    goog.debug.LogManager.rootLogger_ =
        new goog.debug.Logger(goog.debug.Logger.ROOT_LOGGER_NAME);
    goog.debug.LogManager.loggers_[goog.debug.Logger.ROOT_LOGGER_NAME] =
        goog.debug.LogManager.rootLogger_;
    goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG);
  }
};


/**
 * Returns all the loggers.
 * @deprecated Use {@link goog.log.getAllLoggers} instead.
 * @return {!Object<string, !goog.debug.Logger>} Map of logger names to logger
 *     objects.
 */
goog.debug.LogManager.getLoggers = function() {
  'use strict';
  return goog.debug.LogManager.loggers_;
};


/**
 * Returns the root of the logger tree namespace, the logger with the empty
 * string as its name.
 * @deprecated Use {@link goog.log.getRootLogger} instead.
 * @return {!goog.debug.Logger} The root logger.
 */
goog.debug.LogManager.getRoot = function() {
  'use strict';
  goog.debug.LogManager.initialize();
  return /** @type {!goog.debug.Logger} */ (goog.debug.LogManager.rootLogger_);
};


/**
 * Finds a named logger.
 *
 * @param {string} name A name for the logger. This should be a dot-separated
 * name and should normally be based on the package name or class name of the
 * subsystem, such as goog.net.BrowserChannel.
 * @deprecated Use {@link goog.log.getLogger} instead.
 * @return {!goog.debug.Logger} The named logger.
 */
goog.debug.LogManager.getLogger = function(name) {
  'use strict';
  goog.debug.LogManager.initialize();
  var ret = goog.debug.LogManager.loggers_[name];
  return ret || goog.debug.LogManager.createLogger_(name);
};


/**
 * Creates a function that can be passed to goog.debug.catchErrors. The function
 * will log all reported errors using the given logger.
 * @param {?goog.log.Logger=} opt_logger The logger to log the errors to.
 *     Defaults to the root logger.
 * @return {function(Object)} The created function.
 */
goog.debug.LogManager.createFunctionForCatchErrors = function(opt_logger) {
  'use strict';
  return function(info) {
    'use strict';
    var logger = opt_logger || goog.debug.LogManager.getRoot();
    goog.log.error(
        logger,
        'Error: ' + info.message + ' (' + info.fileName +
            ' @ Line: ' + info.line + ')');
  };
};


/**
 * Creates the named logger. Will also create the parents of the named logger
 * if they don't yet exist.
 * @param {string} name The name of the logger.
 * @return {!goog.debug.Logger} The named logger.
 * @private
 */
goog.debug.LogManager.createLogger_ = function(name) {
  'use strict';
  // find parent logger
  var logger = new goog.debug.Logger(name);
  goog.debug.LogManager.loggers_[name] = logger;
  return logger;
};
