This document assumes [the user.keymap
introduction](../deploy/core/User/user.keymap) and [the user.behaviors
introduction](../deploy/core/User/user.behaviors) have been read.

## Introduction

Keymap and behaviors files are ClojureScript data that when merged together
create LightTable's final keys and functionality. A user can add or remove any
keybinding/behavior. This is powerful as any default keybinding/behavior,
whether from LightTable or a plugin, can be removed or overridden by a user.
Next this document will cover configuring behaviors and keybindings through
tags, keys and commands.

## Tags

Tags allow keybindings/behaviors to apply in different contexts i.e. `enter`
means something different in a url bar vs a popup. Under the hood, objects have
tags added and removed which makes a keybinding/behavior apply or not apply to
them respectively. Tags can have optional extensions that make them apply in
different contexts. For example to have the `:editor` tag only apply to a file
for a given filetype use the format `:editor.FILETYPE` e.g.
`:editor.javascript`. Note that for the same keybinding/behavior a tag with
an extension takes precedence over one without.

There are a number of tags that only apply in a unique UI context or widget e.g.
a browser. Here are some common ones:

* :browser - Applies when inside a browser tab
* :editor.keys.hinting.active - Applies when hinting/autocomplete is active
* :filter-list.input - Applies when in a filter-list e.g. Commands pane or Navigator

For more tags see the ones used by default in
[default.keymap](../deploy/settings/default/default.keymap) and
[default.behaviors](../deploy/settings/default/default.behaviors) and search
LightTable for when a context tag is added with
[ctx/in!](https://github.com/LightTable/LightTable/search?utf8=%E2%9C%93&q=%22ctx%2Fin%21%22&type=Code).

## Keybindings

### Keys

LightTable uses [mousetrap](https://github.com/ccampbell/mousetrap) for keyboard
handling. Mousetrap recognizes the following modifier keys: `shift, ctrl,
alt/option and command/cmd`. LightTable also recognizes pmeta which is
command/cmd in OSX and ctrl anywhere else. To specify other special keys like
'enter' see [this Mousetrap documentation](https://craig.is/killing/mice#keys).
LightTable also supports key combinations/sequences when keys are separated by a
space. This allows plugins like Emacs to support key chords like 'ctrl-x u'.

### Keybindings and tags with multiple extensions

To override a keybinding that has multiple extensions e.g.
`:editor.keys.normal`, you must specify a tag that has the same prefix and than
an additional extension e.g. `:editor.keys.normal.clojure`. As an example, let's
override the backspace key which is tagged with `:editor.keys.normal` but only
in a clojure file. In user.behaviors, create a tag when in clojure files which
will override `editor.keys.normal` with `[:editor.cljs :lt.object/add-tag :editor.keys.normal.clojure]`.
Then in user.keymap, use the tag with
`[:editor.keys.normal.clojure "backspace" :add-browser-tab]`. Backspacing in
a clojure tab should now add a browser tab - not that most useful thing ;).

### Commands In Keybindings

Keybindings can run multiple commands by appending them to the end e.g. `[:TAG
"KEYS" :COMMAND1 :COMMAND2]`. While commands are started serially, there isn't a
guarantee that one command is fully finished before the next proceeds. Any
commands that have asynchronous functionality e.g. interaction with a network or
filesystem cannot guarantee when their functionality is complete. Commands can
have arguments passed to them by wrapping them in parenthesis e.g. `(:COMMAND
ARG1 ARG2)`. For example `[:tabs "pmeta-1" (:tabs.goto 0)]` is a default
keybinding that passes `0` as an argument to the `:tabs.goto` command.
