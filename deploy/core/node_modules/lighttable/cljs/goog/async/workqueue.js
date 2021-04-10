/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.provide('goog.async.WorkItem');
goog.provide('goog.async.WorkQueue');

goog.require('goog.asserts');
goog.require('goog.async.FreeList');


// TODO(johnlenz): generalize the WorkQueue if this is used by more
// than goog.async.run.



/**
 * A low GC workqueue. The key elements of this design:
 *   - avoids the need for goog.bind or equivalent by carrying scope
 *   - avoids the need for array reallocation by using a linked list
 *   - minimizes work entry objects allocation by recycling objects
 * @constructor
 * @final
 * @struct
 */
goog.async.WorkQueue = function() {
  'use strict';
  this.workHead_ = null;
  this.workTail_ = null;
};


/** @define {number} The maximum number of entries to keep for recycling. */
goog.async.WorkQueue.DEFAULT_MAX_UNUSED =
    goog.define('goog.async.WorkQueue.DEFAULT_MAX_UNUSED', 100);


/** @const @private {goog.async.FreeList<goog.async.WorkItem>} */
goog.async.WorkQueue.freelist_ = new goog.async.FreeList(
    function() {
      'use strict';
      return new goog.async.WorkItem();
    },
    function(item) {
      'use strict';
      item.reset();
    },
    goog.async.WorkQueue.DEFAULT_MAX_UNUSED);


/**
 * @param {function()} fn
 * @param {Object|null|undefined} scope
 */
goog.async.WorkQueue.prototype.add = function(fn, scope) {
  'use strict';
  var item = this.getUnusedItem_();
  item.set(fn, scope);

  if (this.workTail_) {
    this.workTail_.next = item;
    this.workTail_ = item;
  } else {
    goog.asserts.assert(!this.workHead_);
    this.workHead_ = item;
    this.workTail_ = item;
  }
};


/**
 * @return {goog.async.WorkItem}
 */
goog.async.WorkQueue.prototype.remove = function() {
  'use strict';
  var item = null;

  if (this.workHead_) {
    item = this.workHead_;
    this.workHead_ = this.workHead_.next;
    if (!this.workHead_) {
      this.workTail_ = null;
    }
    item.next = null;
  }
  return item;
};


/**
 * @param {goog.async.WorkItem} item
 */
goog.async.WorkQueue.prototype.returnUnused = function(item) {
  'use strict';
  goog.async.WorkQueue.freelist_.put(item);
};


/**
 * @return {goog.async.WorkItem}
 * @private
 */
goog.async.WorkQueue.prototype.getUnusedItem_ = function() {
  'use strict';
  return goog.async.WorkQueue.freelist_.get();
};



/**
 * @constructor
 * @final
 * @struct
 */
goog.async.WorkItem = function() {
  'use strict';
  /** @type {?function()} */
  this.fn = null;
  /** @type {?Object|null|undefined} */
  this.scope = null;
  /** @type {?goog.async.WorkItem} */
  this.next = null;
};


/**
 * @param {function()} fn
 * @param {Object|null|undefined} scope
 */
goog.async.WorkItem.prototype.set = function(fn, scope) {
  'use strict';
  this.fn = fn;
  this.scope = scope;
  this.next = null;
};


/** Reset the work item so they don't prevent GC before reuse */
goog.async.WorkItem.prototype.reset = function() {
  'use strict';
  this.fn = null;
  this.scope = null;
  this.next = null;
};
