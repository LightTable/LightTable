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

Commands can be executed from ClojureScript and may take arguments.

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
