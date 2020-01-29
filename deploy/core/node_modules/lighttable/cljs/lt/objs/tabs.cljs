(ns lt.objs.tabs
  "Manage tabsets and tabs"
  (:require [lt.object :refer [object* behavior*] :as object]
            [lt.objs.editor :as editor]
            [lt.objs.canvas :as canvas]
            [lt.objs.command :as cmd]
            [lt.objs.animations :as anim]
            [lt.objs.context :as ctx]
            [lt.objs.menu :as menu]
            [lt.util.load :as load]
            [lt.util.dom :refer [$ append] :as dom]
            [lt.util.style :refer [->px]]
            [lt.util.js :refer [now]]
            [crate.core :as crate]
            [crate.binding :refer [bound map-bound subatom]])
  (:require-macros [lt.macros :refer [behavior defui]]))

(load/js "core/node_modules/lighttable/ui/dragdrop.js" :sync)

(def multi-def (object* ::multi-editor2
                        :tags #{:tabs}
                        :tabsets []
                        :left 0
                        :right 0
                        :bottom 0
                        :init (fn [this]
                                (let [tabsets (crate/html [:div.tabsets {:style {:bottom (bound (subatom this :tabset-bottom) ->px)}}])]
                                  (object/merge! this {:tabsets-elem tabsets})
                                  (ctx/in! :tabs this)
                                  [:div#multi {:style {:left (bound (subatom this :left) ->px)
                                                       :right (bound (subatom this :right) ->px)
                                                       :bottom (bound (subatom this :bottom) ->px)}}
                                   tabsets]
                                  ))))

(def multi (object/create multi-def))

(defn ensure-visible [idx tabset]
  (when-let [cur (aget (dom/$$ ".list li" (object/->content tabset)) idx)]
    (let [left (.-offsetLeft cur)
          width (.-clientWidth cur)
          right (+ left width)
          gp (dom/parent (dom/parent cur))
          pwidth (.-clientWidth gp)
          pleft (.-scrollLeft gp)
          pright (+ pleft pwidth)
          inside (and (>= left pleft)
                      (<= right pright))]
      (when-not inside
        (if (> pleft left)
          (set! (.-scrollLeft gp) (- left 50))
          (set! (.-scrollLeft gp) (+ (- right pwidth) 50)))
        ))))

(defn ->index [obj]
  (when (and obj @obj (::tabset @obj))
    (first (first (filter #(= obj (second %)) (map-indexed vector (:objs @(::tabset @obj))))))))

(defn active! [obj]
  (when (and obj
             (::tabset @obj))
    (object/merge! (::tabset @obj) {:active-obj obj})
    (object/raise obj :show)
    (ensure-visible (->index obj) (::tabset @obj))))

(defn update-tab-order [multi children]
  (let [ser (if (vector? children)
              children
              (map #(dom/attr % :pos) children))
        prev-active (:active-obj @multi)]
    (object/merge! multi {:objs (mapv (:objs @multi) ser)
                          :active-obj nil})
    (active! prev-active)
    ))

(defn ->name [e]
  (or
   (get-in @e [:info :name])
   (:name @e)
   "unknown"))

(defn ->path [e]
  (or
   (get-in @e [:info :path])
   (:path @e)
   ""))

(defn active? [c e multi]
  (str c (when (= (@multi :active-obj) e)
           " active")))

(defn dirty? [c e]
  (str c (when (:dirty @e)
           " dirty")))

(defui close-tab [obj]
  [:span.tab-close "x"]
  :click (fn [] (object/raise obj :close)))

(defui item [label multi e pos]
  [:li {:class (-> " "
                   (active? e multi)
                   (dirty? e))
        :draggable "true"
        :title (->path e)
        :obj-id (object/->id e)
        :pos pos}
   [:span.file-name
    (->name e)]
   (when (object/raise-reduce e :close-button+ false)
     (close-tab label))]
  ;; Disable middle-click pasting in linux
  :mouseup (fn [ev]
             (when (or (= 1 (.-button ev)) (.-metaKey ev))
               (dom/prevent ev)))
  :click (fn [ev]
           (if (or (= 1 (.-button ev)) (.-metaKey ev))
             (object/raise label :close)
             (active! e)))
  :contextmenu (fn [ev]
                 (object/raise label :menu! ev)))

(object/object* ::tab-label
                :tags #{:tab-label}
                :init (fn [this multi e pos]
                        (object/merge! this {::tab-object e
                                             :tabset multi})
                        (item this multi e pos)))

(declare move-tab)

(defn objs-list [multi objs]
  (let [prev-tabs (filter #(= (:tabset @%) multi) (object/by-tag :tab-label))
        item (crate/html
              [:ul
               (for [[idx o] (map vector (range) objs)
                     :when @o]
                 (object/->content (object/create ::tab-label multi o idx)))])]
    ;;Remove old tabs
    (doseq [tab prev-tabs]
      (object/destroy! tab))
    (js/sortable item (js-obj "axis" "x" "distance" 10  "scroll" false "opacity" 0.9 "connectWith" ".list"))
    (dom/on item "contextmenu" (fn [e]
                                 (object/raise multi :menu! e)))
    (dom/on item "moved" (fn [e] (move-tab multi (.-opts e)) ))
    (dom/on item "sortupdate" (fn [e] (update-tab-order multi (.-opts e))))
    item))

(defui tabbed-item [active item]
  [:div.content {:style {:visibility (bound active #(if (= % @item)
                                                      "visible"
                                                      "hidden"))}}
   (bound item #(when % (object/->content %)))])

(defui vertical-grip [this]
  [:div.vertical-grip {:draggable "true"}]
  :dragstart (fn [e]
               (set! (.-dataTransfer.dropEffect e) "move")
               (.dataTransfer.setData e "text/plain" nil)
               (object/raise this :start-drag e)
               )
  :dragend (fn [e]
             (object/raise this :end-drag e)
             )
  :drag (fn [e]
          (set! (.-dataTransfer.dropEffect e) "move")
          (object/raise this :width! e)))

(defn ->perc [x]
  (if x
    (str x "%")
    "0"))

(defn floored [x]
  (cond
   (< x 0) 0
   (> x 100) 100
   :else x))

(defn to-perc [width x]
  (* (/ x width) 100))

(defn next-tabset [t]
  (let [ts (@multi :tabsets)]
    (second (drop-while #(not= t %) ts))
    ))

(defn prev-tabset [t]
  (let [ts (@multi :tabsets)]
    (-> (take-while #(not= t %) ts)
        (last))))

(defn previous-tabset-width [cur]
  (let [ts (@multi :tabsets)]
    (reduce + 0 (map (comp :width deref) (take-while #(not= cur %) ts)))
    ))

(defn add-tabset [ts]
  (object/update! multi [:tabsets] conj ts)
  (dom/append (:tabsets-elem @multi) (object/->content ts))
  )

(defn spawn-tabset []
  (let [ts (object/create ::tabset)
        width (- 100 (reduce + (map (comp :width deref) (@multi :tabsets))))]
    (object/merge! ts {:width width})
    (add-tabset ts)
    ts))

(defn equalize-tabset-widths []
  (let [tss (:tabsets @multi)
        width (/ 100.0 (count tss))]
    (doseq [ts tss]
      (object/merge! ts {:width width}))))


(defn temp-width [ts w]
  (dom/css (object/->content ts) {:width (->perc w)
                                  :border-width (if (= 0 w)
                                                  0
                                                  "")}))


(defn activate-tabset [ts]
  (when-not (= (ctx/->obj :tabset) ts)
    (when-let [old (ctx/->obj :tabset)]
      (dom/remove-class (object/->content old) :active))
    (ctx/in! :tabset ts)
    (dom/add-class (object/->content ts) :active)
    true))



(defui tabset-ui [this]
  [:div.tabset {:style {:width (bound (subatom this :width) ->perc)}}
   [:div.list
    (bound this #(objs-list this (:objs %)))]
   [:div.items
    (map-bound (partial tabbed-item (subatom this :active-obj)) this {:path [:objs]})]
   (vertical-grip this)]
  :click (fn []
           (object/raise this :active)))

(object/object* ::tabset
                :objs []
                :active-obj nil
                :count 0
                :tags #{:tabset}
                :width 100
                :init (fn [this]
                        (tabset-ui this)
                        ))

(defn ->tabsets [tabs]
  (for [k tabs]
    (object/->content k)))

(def tabset (object/create ::tabset))

(defn add!
  ([obj] (add! obj nil))
  ([obj ts]
   (when-let [cur-tabset (or ts (ctx/->obj :tabset))]
     (object/add-tags obj [:tabset.tab])
     (object/update! cur-tabset [:objs] conj obj)
     (object/merge! obj {::tabset cur-tabset})
     (add-watch (subatom obj [:dirty]) :tabs (fn [_ _ _ cur]
                                               (object/raise cur-tabset :tab.updated)
                                               ))
     obj)))

(defn rem-tabset
  ([ts] (rem-tabset ts false))
  ([ts prev?]
   (let [to-ts (if prev?
                 (or (prev-tabset ts) (next-tabset ts))
                 (or (next-tabset ts) (prev-tabset ts)))]
     (when to-ts
       (object/merge! to-ts {:width (floored (+ (:width @to-ts) (:width @ts)))})
       (dom/remove (object/->content ts))
       (doseq [t (:objs @ts)]
         (add! t to-ts))
       (object/update! multi [:tabsets] #(vec (remove #{ts} %)))
       (object/destroy! ts)
       (equalize-tabset-widths)
       (object/raise to-ts :active)))))

(defn rem! [obj]
  (when (and obj @obj (::tabset @obj))
    (let [cur-tabset (::tabset @obj)
          idx (->index obj)
          active (:active-obj @cur-tabset)
          aidx (->index active)]
      (remove-watch obj :tabs)
      (object/merge! obj {::tabset nil})
      (object/merge! cur-tabset {:objs (vec (remove #(= obj %) (@cur-tabset :objs)))})
      (if (= obj active)
        (object/raise cur-tabset :tab idx)
        (when (not= aidx (->index active))
          (object/merge! cur-tabset {:active-obj nil})
          (active! active))
        ))))

(defn refresh! [obj]
  (when-let [ts (::tabset @obj)]
    (object/raise ts :tab.updated)))

(defn in-tab? [obj]
  (@obj ::tabset))

(defn add-or-focus! [obj]
  (if (in-tab? obj)
    (active! obj)
    (do
      (add! obj)
      (active! obj))))

(defn num-tabs []
  (reduce (fn [res cur]
            (+ res (count (:objs @cur))))
          0
          (:tabsets @multi)))

(defn active-tab []
  (when-let [cur-tabset (ctx/->obj :tabset)]
    (:active-obj @cur-tabset)))


(defn move-tab-to-tabset [obj ts]
  (rem! obj)
  (add! obj ts)
  (active! obj)
  (object/raise obj :move))

(defn move-tab [multi elem]
  (let [id (dom/attr elem :obj-id)
        idx (dom/index elem)
        obj (object/by-id (js/parseInt id))
        cnt (-> @multi :objs count)]
    (rem! obj)
    (add! obj multi)
    (if (> cnt 0)
      (update-tab-order multi (vec (concat (range idx) [cnt] (range idx cnt)))))
    (active! obj)
    (object/raise obj :move)))

;;*********************************************************
;; Behaviors
;;*********************************************************

(behavior ::on-destroy-remove
          :triggers #{:destroy :closed}
          :reaction (fn [this]
                      (rem! this)
                      ))

(behavior ::active-tab-num
          :triggers #{:tab}
          :reaction (fn [this num]
                      (let [objs (@this :objs)]
                        (if (< num (count objs))
                          (active! (get objs num))
                          (active! (get objs (dec (count objs))))))
                      ))

(behavior ::prev-tab
          :triggers #{:tab.prev}
          :throttle 100
          :reaction (fn [this]
                      (let [objs (@this :objs)
                            idx (->index (:active-obj @this))]
                        (if (> idx 0)
                          (active! (get objs (dec idx)))
                          (active! (get objs (dec (count objs))))))
                      ))

(behavior ::next-tab
          :triggers #{:tab.next}
          :throttle 100
          :reaction (fn [this]
                      (let [objs (@this :objs)
                            idx (inc (->index (:active-obj @this)))]
                        (if (< idx (count objs))
                          (active! (get objs idx))
                          (active! (get objs 0))))
                      ))

(behavior ::tab-close
          :triggers #{:tab.close}
          :reaction (fn [this]
                      (try
                        (let [orig (:active-obj @this)]
                          (object/raise orig :close))
                        (catch :default e
                          (js/lt.objs.console.error e)))))

(behavior ::on-destroy-objs
          :triggers #{:destroy}
          :reaction (fn [this]
                      (doseq [e (:objs @this)]
                        (object/destroy! e))
                      ))

(behavior ::repaint-tab-updated
          :triggers #{:tab.updated}
          :reaction (fn [this]
                      (object/update! this [:count] inc)))

(behavior ::no-anim-on-drag
          :triggers #{:start-drag}
          :reaction (fn [this]
                      (anim/off)))

(behavior ::reanim-on-drop
          :triggers #{:end-drag}
          :reaction (fn [this]
                      (anim/on)))

(behavior ::set-dragging
          :triggers #{:start-drag}
          :reaction (fn [this]
                      (dom/add-class (dom/$ :body) :dragging)
                      ))

(behavior ::unset-dragging
          :triggers #{:end-drag}
          :reaction (fn [this]
                      (dom/remove-class (dom/$ :body) :dragging)
                      ))

(behavior ::set-width-final!
          :triggers #{:end-drag}
          :reaction (fn [this e]
                      (when-let [ts (next-tabset this)]
                        (let [width (dom/width (object/->content multi))
                              left (:left @multi)
                              cx (.-clientX e)
                              new-loc (- (+ width left) cx)
                              new-perc (floored (int (- 100 (previous-tabset-width this) (to-perc width new-loc))))
                              prev-width (:width @this)
                              new-perc (if (>= new-perc (+ (:width @ts) prev-width))
                                         (+ (:width @ts) prev-width)
                                         new-perc)
                              next-width (floored
                                          (if-not ts
                                            1
                                            (+ (:width @ts) (- prev-width new-perc))))]
                          (cond
                           (= new-perc 0) (rem-tabset this)
                           (= next-width 0) (rem-tabset ts :prev)
                           :else
                           (when-not (= cx 0)
                             (if (or (< new-perc 0) )
                               (object/merge! this {:width 100})
                               (when (and (not= cx 0)
                                          ts
                                          (>= new-perc 0)
                                          (>= next-width 0))
                                 (object/merge! this {:width new-perc})
                                 (if ts
                                   (object/merge! ts {:width next-width})
                                   (spawn-tabset)
                                   )))))))))

(behavior ::width!
          :triggers #{:width!}
          :reaction (fn [this e]
                      (let [width (dom/width (object/->content multi))
                            left (:left @multi)
                            cx (.-clientX e)
                            new-loc (- (+ width left) cx)
                            new-perc (floored (int (- 100 (previous-tabset-width this) (to-perc width new-loc))))
                            prev-width (:width @this)
                            ts (next-tabset this)
                            new-perc (if (and ts
                                              (>= new-perc (+ (:width @ts) prev-width)))
                                       (+ (:width @ts) prev-width)
                                       new-perc)
                            next-width (floored
                                        (if-not ts
                                          1
                                          (+ (:width @ts) (- prev-width new-perc))))]
                        (when-not (= cx 0)
                          (if (or (< new-perc 0) )
                            (temp-width this 100)
                            (when (and (not= cx 0)
                                       ts
                                       (>= new-perc 0)
                                       (>= next-width 0))
                              (temp-width this new-perc)
                              (if ts
                                (temp-width ts next-width)
                                (spawn-tabset))))))
                      ))


(behavior ::tab-active
          :triggers #{:active}
          :reaction (fn [this]
                      (activate-tabset (::tabset @this))))

(behavior ::tab-label-menu+
          :triggers #{:menu+}
          :reaction (fn [this items]
                      (conj items
                            {:label "Move tab to new tabset"
                             :order 1
                             :click (fn [] (cmd/exec! :tabs.move-new-tabset (::tab-object this)))}
                            {:label "Close tab"
                             :order 2
                             :click (fn [] (object/raise this :close))})))

(behavior ::on-close-tab-label
          :triggers #{:close}
          :reaction (fn [this]
                      (when-let [e (::tab-object @this)]
                        (object/raise e :close))
                      (object/destroy! this)))

(behavior ::tabset-active
          :triggers #{:active}
          :reaction (fn [this]
                      (when (activate-tabset this)
                        (when-let [active (:active-obj @this)]
                          (object/raise active :focus!)))))

(behavior ::tabset-menu+
          :triggers #{:menu+}
          :reaction (fn [this items]
                      (conj items
                            {:label "New tabset"
                             :order 1
                             :click (fn [] (cmd/exec! :tabset.new))}
                            {:label "Close tabset"
                             :order 2
                             :click (fn [] (rem-tabset this))})))

(behavior ::left!
          :triggers #{:left!}
          :reaction (fn [this v]
                      (object/update! this [:left] + v)))

(behavior ::right!
          :triggers #{:right!}
          :reaction (fn [this v]
                      (object/update! this [:right] + v)))

(behavior ::bottom!
          :triggers #{:bottom!}
          :reaction (fn [this v]
                      (object/update! this [:bottom] + v)))

(behavior ::tabset-bottom!
          :triggers #{:tabset-bottom!}
          :reaction (fn [this v]
                      (object/update! this [:tabset-bottom] + v)))


(behavior ::init-sortable
          :triggers #{:init}
          :reaction (fn [app]
                      (js/initSortable js/window)))

(behavior ::init
          :triggers #{:init}
          :reaction (fn [this]
                      (add-tabset tabset)
                      (object/raise tabset :active)
                      ))

(behavior ::show-close-button
          :desc "Tab: Show close button on tabs"
          :type :user
          :triggers #{:close-button+}
          :reaction (fn [this]
                      true))


;;*********************************************************
;; Commands
;;*********************************************************

(cmd/command {:command :tabs.move-new-tabset
              :desc "Tab: Move tab to new tabset"
              :exec (fn [tab]
                      (when-let [ts (ctx/->obj :tabset)]
                        (when-let [cur (or tab (@ts :active-obj))]
                          (let [new (cmd/exec! :tabset.new)]
                            (move-tab-to-tabset cur new)))))})

(cmd/command {:command :tabs.move-next-tabset
              :desc "Tab: Move tab to next tabset"
              :exec (fn []
                      (when-let [ts (ctx/->obj :tabset)]
                        (let [cur (@ts :active-obj)
                              next (or (next-tabset ts) (prev-tabset ts))]
                          (when (and cur next (not= next ts))
                            (move-tab-to-tabset cur next)))))})

(cmd/command {:command :tabs.move-prev-tabset
              :desc "Tab: Move tab to previous tabset"
              :exec (fn []
                      (when-let [ts (ctx/->obj :tabset)]
                        (let [cur (@ts :active-obj)
                              next (or (prev-tabset ts) (next-tabset ts))]
                          (when (and cur next (not= next ts))
                            (move-tab-to-tabset cur next)))))})

(cmd/command {:command :tabs.next
              :desc "Tab: Next tab"
              :exec (fn []
                      (object/raise (ctx/->obj :tabset) :tab.next))})

(cmd/command {:command :tabs.prev
              :desc "Tab: Previous tab"
              :exec (fn []
                      (object/raise (ctx/->obj :tabset) :tab.prev))})

(cmd/command {:command :tabs.close
              :desc "Tab: Close current tab"
              :exec (fn []
                      (when (= 0 (num-tabs))
                        (cmd/exec! :window.close))
                      (when-let [ts (ctx/->obj :tabset)]
                        (when (and (:active-obj @ts)
                                   @(:active-obj @ts))
                          (object/raise ts :tab.close)))
                      )})

(cmd/command {:command :tabs.close-all
              :desc "Tabs: Close all tabs"
              :exec (fn []
                      (let [objs (object/by-tag :tabset.tab)]
                        (doseq [obj objs]
                          (object/raise obj :close))))})

(cmd/command {:command :tabs.close-others
              :desc "Tabs: Close tabs except current tab"
              :exec (fn []
                      (let [cur (active-tab)
                            objs (object/by-tag :tabset.tab)]
                        (doseq [obj objs]
                          (if-not (identical? cur obj)
                            (object/raise obj :close)))))})

(cmd/command {:command :tabs.goto
              :hidden true
              :desc "Tab: Goto tab # or :last"
              :exec (fn [x]
                      (let [ts (ctx/->obj :tabset)
                            tab-count (count (:objs @ts))
                            idx (dec tab-count)]
                        (object/raise (ctx/->obj :tabset)
                                      :tab (if (= x :last) idx x))))})

(cmd/command {:command :tabset.next
              :desc "Tabset: Next tabset"
              :exec (fn []
                      (if-let [n (next-tabset (ctx/->obj :tabset))]
                        (object/raise n :active)
                        (if-let [n (get (:tabsets @multi) 0)]
                          (object/raise n :active))))})

(cmd/command {:command :tabset.prev
              :desc "Tabset: Previous tabset"
              :exec (fn []
                      (if-let [n (prev-tabset (ctx/->obj :tabset))]
                        (object/raise n :active)
                        (if-let [n (last (:tabsets @multi))]
                          (object/raise n :active))))})

(cmd/command {:command :tabset.close
              :desc "Tabset: Remove active tabset"
              :exec (fn [ts]
                      (rem-tabset (ctx/->obj :tabset)))})

(cmd/command {:command :tabset.new
              :desc "Tabset: Add a tabset"
              :exec (fn []
                      (let [ts (spawn-tabset)]
                        (equalize-tabset-widths)
                        ts))})

(cmd/command {:command :tabs.focus-active
              :desc "Tab: focus active"
              :hidden true
              :exec (fn []
                      (when-let [active (:active-obj @(ctx/->obj :tabset))]
                        (object/raise active :focus!)))})

(append (object/->content canvas/canvas) (:content @multi))
