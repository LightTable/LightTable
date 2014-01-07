# Building

First install or update [leiningen](http://leiningen.org/). Then we have to do some juggling.

On OS X:

``` bash
wget http://d35ac8ww5dfjyg.cloudfront.net/playground/bins/0.5.20/LightTableMac.zip
unzip LightTableMac.zip
mkdir light-table-core-2
mv LightTable light-table-core-2/deploy

git clone git@github.com:Kodowa/light-table-core.git
cp -r light-table-core/* light-table-core-2/

cd light-table-core-2
lein cljsbuild clean && lein cljsbuild once

cd deploy/plugins
rm -rf clojure paredit
git clone git@github.com:Kodowa/LightTable-Clojure.git clojure
git clone git@github.com:LightTable/LightTable-Paredit.git paredit
git clone git@github.com:LightTable/LightTable-Rainbow.git rainbow

cd clojure
./build.sh

cd ../../
export LT_HOME=$(pwd)
./light
```

On Linux (64 bit):

``` bash
wget http://d35ac8ww5dfjyg.cloudfront.net/playground/bins/0.5.20/LightTableLinux64.tar.gz
tar -xzf LightTableLinux64.tar.gz
mkdir light-table-core-2
mv LightTable light-table-core-2/deploy

git clone git@github.com:Kodowa/light-table-core.git
cp -ar light-table-core/* light-table-core-2/

cd light-table-core-2
lein cljsbuild clean && lein cljsbuild once

cd deploy/plugins
rm -rf clojure paredit
git clone git@github.com:Kodowa/LightTable-Clojure.git clojure
git clone git@github.com:LightTable/LightTable-Paredit.git paredit
git clone git@github.com:LightTable/LightTable-Rainbow.git rainbow

cd clojure
./build.sh

cd ../../
export LD_LIBRARY_PATH=$(pwd):$LD_LIBRARY_PATH
./ltbin
```

# Basics

I'll assume you already know how to eval code (ctrl-enter), how to open the command bar (ctrl-space) and how to open files with the navigator (ctrl-o). If you don't, start with the [Light Table tutorial](http://docs.lighttable.com/tutorials/full/).

Add `light-table-core/src` to your Light Table workspace and open `src/lt/objs/jump_stack.cljs`. Hit eval (ctrl-enter) somewhere in the file to start a clojurescript compiler. When it's finished starting up it will ask you where to send the emitted javascript code - choose Light Table UI from the menu. Now you should be able to eval clojurescript code inside your current Light Table instance. Try something simple like `(js/alert "foo")` to make sure it works.

The new Light Table release supports auto-complete (tab), inline docs (ctrl-d) and jump-to-definition (ctrl-. to jump and ctrl-, to jump back) for clojurescript and clojure vars, all of which are very useful for exploring the codebase. In clojurescript these features are only aware of vars that have been evaled in the current compiler process, so be sure to eval the ns form at the top of the file to get the full effect.

For hunting down behaviors, objects and other things that don't live in vars use the searcher (ctrl-shift-f). If it isn't clear how to use a given function then using the searcher to find examples will also help.

Finally, use the documentation searcher (ctrl-shift-d) for full-text search over the names and docstrings of all known vars. Most of Light Table doesn't have docstrings, but this is still useful for library code.

# Behaviors, Objects and Tags

Light Table is organised around behaviors, objects and tags.

Objects are just plain data-structures stored in an atom with a globally unique id. Whenever possible, state in Light Table is stored in objects. Use `lt.object/object*` to create an object template and `lt.object/create` to instantiate a new object from a template.

The jump-stack object here stores a stack of file/pos pairs. Every time you used jump-to-definition, your old file/pos is added to the stack. When you jump back the file/pos is popped from the stack.

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

You can add documentation to behaviors eg

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

You can also debounce (or similarly throttle) the reaction function eg

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
 :stack [["/home/jamie/light-table-core/src/lt/objs/jump_stack.cljs" {:line 48, :ch 48}]]}
```

The most interesting keys here are `:stack`, which was added in the template and is used to store the file/pos stack, and `:listeners`, which maps triggers to behaviors. If we were to eval something like `(lt.object/raise jump-stack :jump-stack.push! editor file pos)` then the behavior `lt.objs.jump-stack/jump-stack.push` would be called with arguments `[editor file pos]`.

This is much like traditional event systems, the main difference being the object/behavior relationship is expressed as simple data-structures which can be easily introspected and modified at runtime. You can see the defaults for that data-structure by running the command `Settings: Default behaviors`. In that file there is a line that adds the `::jump-stack.push` and `::jump-stack.pop` behaviors to any object with the `:jump-stack` tag.

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

# Commands

Commands are a simple way of exposing functions to the user.

``` clj
(cmd/command
 {:command :editor.jump-to-definition-at-cursor
  :desc "Editor: Jump to definition at cursor"
  :exec (fn []
          (when-let [ed (lt.objs.editor.pool/last-active)]
            (object/raise ed :editor.jump-to-definition-at-cursor!)))})

(cmd/command
 {:command :editor.jump-to
  :desc "Editor: Jump to file/pos"
  :hidden true
  :exec (fn [file pos]
          (jump-to file pos))})

(cmd/command
 {:command :editor.unjump
  :desc "Editor: Jump back to where you jumped from"
  :exec (fn []
          (object/raise jump-stack :jump-stack.pop!))})
```

Commands can be executed from clojurescript and may take arguments.

``` clj
(cmd/exec! :editor.unjump)
(cmd/exec! :editor.jump-to file pos)
```

Commands can also be bound to key chords. Run the command `Settings: Default keymap` to see the default mappings. Key-bindings are grouped by tag and are only active when the focused object has a matching tag. Like behaviors, keymaps are reloaded on eval and the default, user and plugin keymaps are all merged together to determine the final bindings.

``` clj
;; a simple custom keymap
{:+ {:app {"ctrl-pagedown" [:tabs.next]
           "ctrl-pageup" [:tabs.prev]
           "ctrl-home" [:workspace.show]
           "ctrl-end" [:show-connect]}}
     :editor {"ctrl-shift-0" [:paredit.grow.right]
              "ctrl-shift-9" [:paredit.grow.left]
              "ctrl-]" [:paredit.shrink.right]
              "ctrl-[" [:paredit.shrink.left]
              "ctrl-'" [:paredit.select.parent]
              "ctrl-a" [:editor.line-start]
              "ctrl-e" [:editor.line-end]
              "ctrl-/" [:editor.select-line]}}
```

# Plugins

See [LightTable-Declassifier](https://github.com/LightTable/LightTable-Declassifier) for an example clojurescript plugin.