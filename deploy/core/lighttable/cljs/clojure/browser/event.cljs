;;  Copyright (c) Rich Hickey. All rights reserved.
;;  The use and distribution terms for this software are covered by the
;;  Eclipse Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
;;  which can be found in the file epl-v10.html at the root of this distribution.
;;  By using this software in any fashion, you are agreeing to be bound by
;;  the terms of this license.
;;  You must not remove this notice, or any other, from this software.

(ns ^{:doc "This namespace contains functions to work with browser
events.  It is based on the Google Closure Library event system."
      :author "Bobby Calderwood"}
  clojure.browser.event
  (:require [goog.events :as events])
  (:import (goog.events EventTarget EventType)))

(defprotocol IEventType
  (event-types [this]))

(extend-protocol IEventType

  EventTarget
  (event-types
    [this]
    (into {}
          (map
           (fn [[k v]]
             [(keyword (.toLowerCase k))
              v])
           (merge
            (js->clj EventType))))))

(when (exists? js/Element)
  (extend-protocol IEventType

    js/Element
    (event-types
      [this]
      (into {}
            (map
             (fn [[k v]]
               [(keyword (.toLowerCase k))
                v])
             (merge
              (js->clj EventType)))))))

(defn listen
  ([src type fn]
     (listen src type fn false))
  ([src type fn capture?]
     (events/listen src
                    (get (event-types src) type type)
                    fn
                    capture?)))

(defn listen-once
  ([src type fn]
     (listen-once src type fn false))
  ([src type fn capture?]
     (events/listenOnce src
                        (get (event-types src) type type)
                        fn
                        capture?)))

(defn unlisten
  ([src type fn]
     (unlisten src type fn false))
  ([src type fn capture?]
     (events/unlisten src
                      (get (event-types src) type type)
                      fn
                      capture?)))

(defn unlisten-by-key
  [key]
  (events/unlistenByKey key))

(defn dispatch-event
  [src event]
  (events/dispatchEvent src event))

(defn expose [e]
  (events/expose e))

(defn fire-listeners
  [obj type capture event])

(defn total-listener-count []
  (events/getTotalListenerCount))

;; TODO
(defn get-listener [src type listener opt_capt opt_handler]); ⇒ ?Listener
(defn all-listeners [obj type capture]); ⇒ Array.<Listener>

(defn unique-event-id [event-type]); ⇒ string

(defn has-listener [obj opt_type opt_capture]); ⇒ boolean
;; TODO? (defn listen-with-wrapper [src wrapper listener opt_capt opt_handler])
;; TODO? (defn protect-browser-event-entry-point [errorHandler])

(defn remove-all [opt_obj opt_type opt_capt]); ⇒ number
;; TODO? (defn unlisten-with-wrapper [src wrapper listener opt_capt opt_handler])
