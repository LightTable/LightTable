# Behaviors, Objects and Tags

Light Table is organised around behaviors, objects and tags.

Objects are just plain data-structures stored in an atom with a globally unique id. Whenever possible, state in Light Table is stored in objects. Use `lt.object/object*` to create an object template and `lt.object/create` to instantiate a new object from a template.

The jump-stack object here stores a stack of file/pos pairs. Every time you use jump-to-definition, your old file/pos is added to the stack. When you jump back the file/pos is popped from the stack.

``` clj
(def jump-stack (object/create (object/object* ::jump-stack
                                               :tags [:jump-stack]
                                               :stack [])))
```

Behaviors are defined with `lt.macros/behavior`. The required fields are `:triggers`, which gives the set of triggers that this behavior will react to, and `:reaction`, which defines the callback function. The macro also assigns a name to the reaction so that the stack-traces are readable.

``` clj
(behavior ::jump-stack.push
           :triggers #{:jump-stack.push!}
           :reaction (fn [jump-stack editor file pos]
                       (let [old-file (:path (:info @editor))
                             old-pos (editor/->cursor (lt.objs.editor.pool/last-active))]
                         (if-not (files/exists? file)
                           (notifos/set-msg! (str "Could not find file: " file) {:class "error"})
                           (do (jump-to file pos)
                             (object/update! jump-stack [:stack] conj [old-file old-pos]))))))
```

You can add documentation to behaviors. E.g.,

``` clj
(behavior ::run-on-init
                  :triggers #{:init}
                  :desc "App: Run commands on start"
                  :params [{:label "commands"
                            :type :list
                            :items cmd/completions}]
                  :type :user
                  :reaction (fn [this & commands] ...))
```

You can also debounce (or similarly throttle) the reaction function. E.g.,

``` clj
(behavior ::show-info-on-move
                  :triggers #{:move}
                  :debounce 200
                  :reaction (fn [this] ...))
```

If you highlight `jump-stack` and hit eval you will see the current state of the object, which is probably something like:

``` clj
{:lt.object/id 42,
 :lt.object/type :lt.objs.jump-stack/jump-stack,
 :tags #{:jump-stack :object},
 :content nil,
 :triggers [],
 :args nil,
 :children {},
 :listeners {:jump-stack.push! [:lt.objs.jump-stack/jump-stack.push],
             :jump-stack.pop! [:lt.objs.jump-stack/jump-stack.pop],
             :destroy [:lt.objs.clients/on-destroy-remove-cb]},
 :stack [["/home/jamie/LightTable/src/lt/objs/jump_stack.cljs" {:line 48, :ch 48}]]}
```

The most interesting keys here are `:stack`, which was added in the template and is used to store the file/pos stack, and `:listeners`, which maps triggers to behaviors. If we were to eval something like `(lt.object/raise jump-stack :jump-stack.push! editor file pos)` then the behavior `lt.objs.jump-stack/jump-stack.push` would be called with arguments `[editor file pos]`.

This is much like traditional event systems, the main difference being the object/behavior relationship is expressed as simple data-structures which can be easily introspected and modified at runtime. You can see the defaults for that data-structure by running the command `Settings: Default behaviors`. In that file, there is a line that adds the `::jump-stack.push` and `::jump-stack.pop` behaviors to any object with the `:jump-stack` tag.

``` clj
:jump-stack [:lt.objs.jump-stack/jump-stack.push :lt.objs.jump-stack/jump-stack.pop]
```

The `lt.object/add-tag` behavior adds a tag to any object it is attached to. This is useful for defining groups of behaviors that are often applied together.

``` clj
:watchable #{:lt.plugins.watches/watch!
             :lt.plugins.watches/unwatch!
             :lt.plugins.watches/eval-on-watch-or-unwatch}
:editor.javascript #{(:lt.object/add-tag :watchable)
                     ...},
:editor.python #{(:lt.object/add-tag :watchable)
                 ...},
:editor.clj #{(:lt.object/add-tag :watchable)
               ...},
```

You can add and remove mappings by running the command `Settings: User behaviors`. In addition, any plugins that you install may also provide `.behaviors` files. On startup and whenever you eval/save a `.behaviors` file, all of these files are merged together to produce the final mapping and then the listeners for every object are updated. Since almost everything in Light Table is built out of objects and behaviors this means that you can modify almost everything without restarting. For example, in part of my `user.behaviors` I disable line-wrapping in all files except markdown and plaintext and I also remove the top menubar.

``` clj
{:+ {:editor [:lt.objs.editor/no-wrap],
     :editor.markdown [:lt.objs.editor/wrap],
     :editor.plaintext [:lt.objs.editor/wrap]},

 :- {:app [:lt.objs.menu/create-menu
           :lt.objs.menu/set-menu]
     :window [:lt.objs.menu/set-menu]}}
```
