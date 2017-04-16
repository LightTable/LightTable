# Workflow

I'll assume you already know how to eval code (Cmd/Ctrl-enter), how to open the command bar (Ctrl-space) and how to open files with the navigator (Cmd/Ctrl-o). If you don't, start with the [Light Table tutorial](http://docs.lighttable.com/tutorials/full/).

Add `LightTable/src` to your Light Table workspace and open `src/lt/objs/jump_stack.cljs`. Hit eval
(Cmd/Ctrl-enter) somewhere in the file to start a ClojureScript compiler. When it's finished
starting up it will ask you where to send the emitted JavaScript code - choose Light Table UI from
the menu. Now you should be able to eval ClojureScript code inside your current Light Table
instance. Try something simple like `(js/alert "foo")` to make sure it works. Generally, we eval
code as we write it and only compile with `lein cljsbuild once app` if we need to restart Light Table.

The new Light Table release supports auto-complete (Tab), inline docs (Ctrl-d) and jump-to-definition (Ctrl-. to jump and Ctrl-, to jump back) for ClojureScript and Clojure vars, all of which are very useful for exploring the codebase. In ClojureScript these features are only aware of vars that have been eval'd in the current compiler process, so be sure to eval the ns form at the top of the file to get the full effect.

For hunting down behaviors, objects and other things that don't live in vars use the searcher (Cmd/Ctrl-Shift-f). If it isn't clear how to use a given function then using the searcher to find examples will also help.

Finally, use the documentation searcher (Ctrl-Shift-d) for full-text search over the names and docstrings of all known vars. Most of Light Table doesn't have docstrings, but this is still useful for library code.

# Note on Hotkeys for OS X

Many (though not all) of the OS X hotkeys mentioned in the Light Table documentation use the cmd key instead of ctrl.

When in doubt, you can look up the key sequence by name by pressing ctrl-space (yes, it's really ctrl on this one) and then typing part of the name of the command you want to use. If a key is mapped to the command, it will be printed right below the command name in the command bar.
