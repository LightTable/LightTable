(ns lt.objs.langs.js
  (:require [lt.object :as object]
            [lt.objs.eval :as eval]
            [lt.objs.editor :as ed]
            [lt.objs.clients.ws :as ws]
            [lt.objs.clients :as clients]
            [lt.objs.sidebar.clients :as scl]
            [lt.objs.browser :as browser]
            [lt.objs.notifos :as notifos]
            [lt.objs.sidebar.command :as cmd]
            [lt.objs.popup :as popup]
            [lt.util.dom :refer [$ append]]
            [lt.util.cljs :refer [clj->js js->clj]])
  (:require-macros [lt.macros :refer [defui]]))

(def util-inspect (.-inspect (js/require "util")))
(def acorn (.-parse (js/require "acorn")))
(def head ($ :head))

(defn inspect [thing depth]
  (util-inspect thing false (or depth 5)))

(defui script [src]
  [:script {:src src :type "text/javascript"}])

(defn load-script [s]
  (append head (script s)))

(defn parse [code]
  (acorn code (clj->js {:locations true})))

(defn ->body [tree]
  (if (> 1 (count (.-body tree)))
    (.-body tree)
    (let [node (aget (.-body tree) 0)]
      (if (and (= (.-type node) "ExpressionStatement")
               (.-expression.callee node)
               (.-expression.callee.body node))
        ;;we have a wrapping function
        (.-expression.callee.body.body node)
        (.-body tree)
      ))))

(defn ->forms [body]
  (doall (map (fn [f]
                {:loc (.-loc f)
                 :type (.-type f)})
              body)))

(defn by-pos [locs pos]
  (let [line (:line pos)]
    (first (filter #(and (<= (.-start.line (:loc %)) line)
                         (>= (.-end.line (:loc %)) line))
                   locs))))

(defn expression? [{:keys [type]}]
  (= type "ExpressionStatement"))

(defn pos->form [text pos]
  (let [pos (update-in pos [:line] inc)
        {:keys [loc type]} (-> text
                                (parse)
                                (->body)
                                (->forms)
                                (by-pos pos))
        start (when loc (.-start loc))
        end (when loc (.-end loc))]
    (when start
      {:type type
       :start {:line (dec (.-line start))
               :ch (.-column start)}
       :end {:line (dec (.-line end))
             :ch (.-column end)}})))

(defn src->watch [ed src pos]
  (let [[src semi] (if (= (last src) ";")
                      [(subs src 0 (dec (count src))) ";"]
                      [src ""])
        opts (js-obj "start" (.-from pos)
                     "end" (.-to pos)
                     "obj" (object/->id ed))
        opts-str (.stringify js/JSON opts)]
    (str "lttools.watch(" src ", " opts-str ")" semi)))

(defn watched-range [ed start end]
  (let [doc (.Doc js/CodeMirror (ed/->val ed))
        range (when start
                (ed/mark doc start (update-in end [:ch] inc) {:inclusiveLeft true :inclusiveRight true}))
        ;;add watch ranges
        watches (doall (for [watch (:watches @ed)
                             :let [pos (.find watch)]]
                         (ed/mark doc (.-from pos) (.-to pos)  {:className "watched"})))]
    ;;replace watched ranges with code
    (doseq [watch watches
            :let [pos (.find watch)
                  text (ed/range doc (.-from pos) (.-to pos))]]
      (ed/replace doc (.-from pos) (.-to pos) (src->watch ed text pos)))
    (if range
      (let [pos (.find range)]
        (ed/range doc (.-from pos) (.-to pos)))
      (ed/->val doc))))

(object/behavior* ::on-eval
                  :triggers #{:eval}
                  :reaction (fn [editor]
                              (object/raise js-lang :eval! {:origin editor
                                                             :info (assoc (@editor :info)
                                                                     :code (ed/->val editor))})))

(object/behavior* ::on-eval.one
                  :triggers #{:eval.one}
                  :reaction (fn [editor]
                              (try
                                (let [code (ed/->val editor)
                                      pos (ed/->cursor editor)
                                      {:keys [start end] :as meta} (pos->form code pos)
                                      form (when meta (watched-range editor start end))
                                      info (:info @editor)
                                      info (if (ed/selection? editor)
                                             (assoc info
                                               :code (ed/selection editor)
                                               :meta {:start {:line (-> (ed/->cursor editor "start") :line)}
                                                      :end {:line (-> (ed/->cursor editor "end") :line)}
                                                      :type "ExpressionStatement"})
                                             (when form
                                               (assoc info :pos pos :code form :meta meta)))
                                      info (update-in info [:code] #(-> %
                                                                        (eval/pad (-> info :meta :start :line))
                                                                        (eval/append-source-file (-> @editor :info :path))))]
                                  (when info
                                    (object/raise js-lang :eval! {:origin editor
                                                                  :info info})))
                                (catch js/global.Error e
                                  (object/raise editor :editor.eval.js.exception {:ex e :meta {:end {:line (dec (.-loc.line e))}}})))
                             ))

(object/behavior* ::js-result
                  :triggers #{:editor.eval.js.result}
                  :reaction (fn [editor res]
                              (notifos/done-working)
                              (let [loc (-> res :meta :end)
                                    loc (assoc loc :start-line (-> res :meta :start :line))]
                                (if (expression? (:meta res))
                                  (let [str-result (if (:no-inspect res)
                                                     (if (:result res)
                                                       (:result res)
                                                       "undefined")
                                                     (inspect (:result res)))]
                                    (object/raise editor :editor.result str-result loc {:prefix " = "}))
                                  (object/raise editor :editor.result "✓" loc {:prefix " "})))))

(object/behavior* ::js-watch
                  :triggers #{:editor.eval.js.watch}
                  :reaction (fn [editor res]
                              (let [loc (-> res :meta :end)
                                    loc (assoc loc :start-line (-> res :meta :start :line))]
                                  (let [str-result (inspect (:result res) 0)]
                                    (object/raise editor :editor.result str-result loc {:type :watch})
                                    ))))

(object/behavior* ::js-exception
                  :triggers #{:editor.eval.js.exception}
                  :reaction (fn [editor ex]
                              (notifos/done-working)
                              (let [stack (if (.-stack (:ex ex))
                                            (.-stack (:ex ex))
                                            (:ex ex))
                                    loc (-> ex :meta :end)
                                    loc (assoc loc :start-line (-> ex :meta :start :line))]
                                (object/raise editor :editor.exception stack loc))
                              ))

(object/behavior* ::js-success
                  :triggers #{:editor.eval.js.file.success}
                  :reaction (fn [editor]
                              (notifos/done-working)
                              (notifos/set-msg! (str "Eval success: " (-> @editor :info :name)))))

(object/behavior* ::eval!
                  :triggers #{:eval!}
                  :reaction (fn [this event]
                              (let [{:keys [info origin]} event]
                                (notifos/working "")
                                (clients/send (eval/get-client! {:command :editor.eval.js
                                                                 :origin origin
                                                                 :info info})
                                              :editor.eval.js
                                              (assoc info :ed-id (object/->id origin))
                                              :only origin))))

(object/object* ::js-lang
                :tags #{}
                :behaviors [::eval!]
                :triggers #{:eval!})

(def js-lang (object/create ::js-lang))

(object/tag-behaviors :editor.javascript #{::on-eval ::on-eval.one ::js-success ::js-result ::js-exception ::js-watch})

(cmd/command {:command :connect-to-browser
              :desc "Connect: Browser (Script-tag)"
              :exec (fn []
                      (popup/popup! {:header "Connect to a browser"
                                     :body [:p "To connect just include the following script tag in the head of your web page:"
                                            [:code "<script type='text/javascript' id='lt_ws' src='http://localhost:" ws/port "/socket.io/lighttable/ws.js'></script>"]]
                                     :buttons [{:label "ok"}]}))})

(scl/add-connector {:name "Browser (External)"
                    :desc "Connect to an external browser via script tag to eval JavaScript, CSS, and HTML live."
                    :connect (fn []
                               (cmd/exec! :connect-to-browser))})

(browser/add-util :watch (fn [exp meta]
                           (object/raise (object/by-id (.-obj meta)) :editor.eval.js.watch {:result exp :meta (js->clj meta :keywordize-keys true)})
                           exp))

;(println (inspect (->body cur)))