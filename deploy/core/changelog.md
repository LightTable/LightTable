#Changes

## 0.8.1

* CHANGED: [:app :lt.objs.settings/pair-keymap-diffs] behavior is being deprecated. Use [:editor :lt.objs.editor/autoclose-brackets] in your user.behaviors instead. lt.objs.editor/autoclose-brackets should fix autoclosing characters e.g. '[{" for international users.
* CHANGED: Backspace key uses the same CodeMirror plugin that lt.objs.editor/autoclose-brackets does
* CHANGED: lt.util.cljs/js->clj is being deprecated. Plugin authors can use the js->clj that comes with ClojureScript
* CHANGED: Removed unused lt.objs.titlebar ns and lt.objs.titlebar/add-titlebar behavior
* CHANGED: Removed unused styling in structure.css
* CHANGED: Removed harbor and jshint node packages that belong to other LightTable plugins
* CHANGED: Removed :hide-connect command which is the same as :show-connect
* CHANGED: Removed light skin which was just a confusing pointer to dark skin
* CHANGED: files/open-sync logs an error when trying to open a nonexistent file. Previously the error was ignored
* CHANGED: Check for updates every hour instead of every 5 minutes
* FIX: Git (vcs) friendly! Changing branches and doing rebases doesn't cause buggy dialogs. If a file is removed, the tab is closed. If a file has a local modification, the user decides whether to overwrite the current file or not
* FIX: LightTable documentation supports navigation as it is now in a browser tab
* FIX: Save and remove trailing whitespace behavior refreshes tab
* FIX: Navigator no longer cuts off end of files i.e. can scroll horizontally
* FIX: Case sensitive renaming of files e.g. readme -> README
* FIX: Faster detection of binaries in build scripts
* FIX: In linux, middle click to close tab doesn't paste clipboard contents
* FIX: :open-path command resolves relative paths before opening them
* FIX: Clearer description of font-settings behavior
* FIX: Clear console error when github endpoints returns invalid JSON
* FIX: All errors are consistently caught and logged to console
* ADDED: Light Table builds without warnings on ClojureScript 1.7.x
* ADDED: Add build target for generating cljsdeps.js (need for ClojureScript upgrade)
* ADDED: Linux and Windows users have access keys on menus
* ADDED: Linux and Windows users have additional menu items under File: Quit Light Table and About Light Table
* ADDED: Added file type definitions for html templates: ERB, ASPX, EJS, JSP
* ADDED: Command-0/Ctrl-0 to reset zoom and Command-=/Ctrl-= to zoom in
* ADDED: Disply notification to user after installing/updating/uninstalling a plugin

## 0.8.0

* CHANGED: We have switched to Electron from NW.js
* CHANGED: LT's releases and self-updating processes are completely in the open on Github
* CHANGED: We no longer ship with a node binary as we're able to use Electon's node binary for background processes
* CHANGED: Proxy support has been disabled. There is an issue for re-enabling it at https://github.com/LightTable/LightTable/issues/1984. We are looking for help on how to QA this.
* CHANGED: `:lt.objs.app/set-default-zoom-level` behavior takes a value from 0 to 1. With NW.js, it could take negative numbers which no longer work and will _freeze_ LT on startup
* CHANGED: When opening a file from the commandline, each invocation opens a new LightTable app regardless of whether LightTable is already open. To optionally bring back the old behavior, see https://github.com/LightTable/LightTable/issues/2014.
* CHANGED: Provide constant port number 5678 for external browser connection
* CHANGED: Beginner friendly explanations to user.keymap and user.behaviors
* CHANGED: 32-bit linux is no longer an official download. Building from source will still be supported
* FIX: Major usability issues on >= OSX 10.10
* FIX: Bug in :editor.force.wrap command
* FIX: Invalid behaviors warning when installing plugin
* FIX: Uninstalling plugin causes misleading missing dialog to popup
* FIX: Installing plugins, loads new behaviors immediately
* FIX: Open files from commandline that have whitespace
* FIX: Styling for folding
* FIX: Creating files under folders with '.' in name
* FIX: Quote and link styling for default theme
* FIX: Fat cursor not showing up when searching in default theme
* FIX: Uncomment command respects line-comment-options behavior
* FIX: Opening file from OSX file manager opens correct file
* FIX: Width of inputs for renaming files in workspace tree
* FIX: Detect latest plugin versions in plugin manager
* ADDED: LT can be built from source with provided scripts across supported platforms
* ADDED: Improved documentation - most core fns have docstrings, all namespaces have docstrings, [API docs](http://lighttable.github.io/LightTable/api/) and [developer docs](https://github.com/LightTable/LightTable/tree/master/doc)
* ADDED: Most of LT's node libraries are installed as npm dependencies instead of as forked libraries
* ADDED: Vector format support for workspace behaviors
* ADDED: Open to line number from commandline e.g. `light FILE:LINE `
* ADDED: commandline comes with improved --help
* ADDED: `:lt.objs.editor/load-addon` behavior loads CodeMirror addons that [ship with LT](https://github.com/LightTable/LightTable/tree/master/deploy/core/node_modules/codemirror/addon)
* ADDED: `:lt.objs.editor/set-rulers` behavior to set CodeMirror rulers - [screenshot](https://www.dropbox.com/s/ipq7c21w1dkwmg3/Screenshot%202015-01-24%2011.50.25.png?dl=0)
* ADDED: Add file-type definitions for .feature, .rst and [many more](https://github.com/LightTable/LightTable/commit/a12dc47d78825897b9a7bdcfafa72525eb4949f7)
* ADDED: Add F-11 keybinding for fullscreen
* ADDED: Add pmeta-/ for toggle-comment
* ADDED: Better error handling for download errors
* ADDED: Block comment command
* ADDED: Max length for autocompletion is configurable
* ADDED: Plugins and settings menu items

##0.7.2

* FIX: Behavior ordering issue that caused plugin weirdness and menus disappearing (ibdknox)
* FIX: allow single arity logs (one-more-minute)
* FIX: changelog additions (cldwalker)

##0.7.1

* FIX: styling issues in the searcher
* FIX: roll back to an older version of node-webkit as a result of freezing issues when compiling certain plugins
* FIX: Give the auto-close keymap behavior a description: `Editor: auto-close parens/brackets/quotes/pairs`

##0.7.0

* CHANGED: Enter doesn't select a completion by default anymore, just tab. Add `[:editor.keys.hinting.active "-enter" [:passthrough]]` to your keymap get it back.
* CHANGED: parens are not auto-closed by default anymore, add `[:app :lt.objs.settings/pair-keymap-diffs]` to your behaviors to get it back.
* CHANGED: Move to the MIT License (one-more-minute)
* CHANGED: Remove plugin server and use Github as the plugin-metadata repository (ibdknox)
* CHANGED: New flat syntax for behaviors and keymaps that allows much better copying and pasting
* CHANGED: Move all Light Table websites to Github pages
* FIX: Linux run script portability (gruns)
* FIX: Fix CodeMirror search failing with RegExp (blandinw)
* FIX: Better websocket-based eval (ibdknox)
* FIX: Allow custom colors for rainbow parens (Victor Cottin)
* FIX: download via https (dkinzer)
* FIX: editor conversion in the editor API (one-more-minute)
* FIX: Note hotkeys for OSX (gekkoe)
* FIX: Jump stack fixes (cldwalker)
* FIX: diff ordering was slightly wrong (ibdknox)
* FIX: prevent errors without lines from throwing (ibdknox)
* FIX: show notifications for errors without editor locations (ibdknox)
* FIX: emacs find fixes (joshuafcole)
* FIX: fix connector failing to connect (mortalapeman)
* FIX: use menu behaviors for all menus (ibdknox)
* FIX: search no longer randomly searches on keyup/keydown (ibdknox)
* FIX: prevent tab labels from leaking (ibdknox)
* FIX: remove unused/non-existent behaviors (cldwalker)
* FIX: remove all CLJS compiler warnings (brabadu cldwalker joshuafcole)
* FIX: fix Haxe extension (cldwalker)
* FIX: prevent the same folder/file from being added to the workspace twice (brabadu)
* FIX: fix regexp replace (ibdknox)
* FIX: lots of error reporting fixes (ibdknox cldwalker)
* FIX: much better completion/helper interaction for behaviors and commands
* README FIX: tons of readme updates (cldwalker)
* ADDED: You can now open multiple copies of a single file (cldwalker)
* ADDED: duplicate file action to workspace menu (seancaffery)
* ADDED: when wrapping with parens, select the result (one-more-minute)
* ADDED: copy exception menu item for inline exceptions (joshuafcole)
* ADDED: copy support for the console (joshuafcole)
* ADDED: menu for inline results (mortalapeman)
* ADDED: show plugins directory in about tab (cldwalker)
* ADDED: allow command shortcutting (ibdknox)
* ADDED: `File: Open another view of current file` command
* ADDED: indent-level aware backspace (one-more-minute)
* ADDED: user plugin (cldwalker)
* ADDED: `Settings: User script` command (cldwalker)
* ADDED: Allow folding at a location (ndr-qef)
* ADDED: auto convert old behaviors/keymaps to the flat syntax (cldwalker)
* UPDATED: CodeMirror
* UPDATED: Latest node-webkit

##0.6.7

* FIX: Workspace behaviors do not correctly take effect on startup (mortalapeman)
* FIX: Focus issues that cause weird save/eval behavior. (ibdknox)
* FIX: fix default theme issues (ibdknox & skrat)
* FIX: Ignore drag events so that "null" doesn't get input into the editor
* FIX: line ending preservation was broken #359 (ibdknox)
* FIX: Clojure client couldn't be created from the add connection menu ibdknox
* FIX: CSS save issue (ibdknox)
* ADDED: proxy support via http_proxy and https_proxy env vars (sethyuan)
* README FIX: default keybinding for the searcher on OSX (gekkie808)

##0.6.6

* FIX: combine try-read catches now that :default is available in cljs (cldwalker)
* FIX: tweak show-docs command to open only one doc (snufkon)
* FIX: update solarized (ccspell and gozala)
* FIX: source map urls were not correctly encoded (nickgieschen)
* FIX: Ignore case when sorting plugins (seancaffery)
* FIX: Remove windowVerbatimArguments to fix pathing issues for processes on windows
* FIX: Push the initial position onto the stack when jumping (joshuafcole)
* FIX: remove warning from eclipse theme (Bost)
* FIX: don't move the search forward after every keypress (jamii)
* FIX: Prevent font settings from being unnecessarily updated (ibdknox)
* ADDED: Multiple cursor commands from CM4
* ADDED: Multiple fonts support (ykomatsu)
* ADDED: reasonable default keybindings for zoom (cldwalker)
* ADDED: select the previous search text when bringing up the searcher (Bost)
* ADDED: Report bug button on welcome screen (Tyrieke Morton)
* ADDED: `Editor: Set options for line commenting` behavior (cldwalker)
* ADDED: you can right click to copy an inline result (cldwalker)
* API: make tab and tabset menus extensible (mortalapeman)
* API: log context changes (ndr-qef)
* API: checks for required keys in commands (cldwalker)
* API: add copy and paste platform functions (cldwalker)
* API: open-path function (cldwalker)
* API: Make $ and $$ multi-arity (mortalapeman)
* API: editor.add-gutter and remove-gutter functions (seancaffery)
* UPDATED: CodeMirror 4!
* UPDATED: CodeMirror modes

##0.6.5

* FIX: Less syntax highlighting would cause errors
* FIX: Show update button below uninstall button in the plugin manager (mark.fisher)
* FIX: better cljs errors in external browser connections
* FIX: php syntax highlighting was set incorrectly (flaviozantut)
* FIX: Evaling CSS into LT UI fails
* FIX: remove the alt-# keybindings as it screws up international keyboards
* FIX: rewrite sourceMappingURL with full path (nickgieschen)
* FIX: on OSX chorded shortcuts were being intercepted by the menus (e.g. ctrl-f)
* FIX: change cursor to pointer in the plugin manager (seancaffrey)
* FIX: prevent opening multiple console tabs  (spelufo)
* FIX: add ellipsis to truncated inline results (ndr-qef)
* FIX: remove last remaining refs to light-table-core (cldwalker)
* FIX: add common lisp extension (patrickconnelly)
* FIX: focusing the url bar in the internal browser selects the url (Curtis Rasmussen)
* FIX: find/replace with '(' now works
* ADDED: `Plugins: Update all outdated` command (ndr-qef)
* ADDED: Searcher picks up your selection by default (snufkon)
* ADDED: `Navigate: set maximum number of indexed files` behavior (ndr-qef)
* ADDED: `Tab: Move tab to new tabset` command and context menu item (snufkon)
* ADDED: `Tabs: Close tabs except current tab` command (snufkon)
* ADDED: a close tab button on hover of tabs (Tyrieke Morton)
* ADDED: `Tabs: Close all tabs` command (piyushi0101)
* ADDED: Plugins now check for missing deps on startup allowing you to use the dependencies key of a personal plugin as your "dotfiles"
* ADDED: `Plugins: Ignore cache and force reload the current behaviors file` command for plugin development
* ADDED: close tab with middle/cmd+click (seancaffery)
* ADDED: `App: Set the default zoom level` behavior for hidpi
* ADDED: leiningen directions to readme (statesside)
* API: allow editor/adjust-loc to specify line movement (ndr-qef)
* API: added `trigger` to `:object.behavior.time` event for complete event introspection
* API: added object/assoc-in! (ndr-qef)

##0.6.4

* FIX: plugins would sometimes fail to install due to bad tar headers
* UPDATED: Move to npm-tar 0.1.19

##0.6.3

* FIX: Remove use of the removed `thread` macro (MarcoPolo)
* FIX: Tabsets don't properly resize after being removed (Morgawr)
* FIX: handle non-dommable errors better (e.g. you throw an object)
* FIX: Matching bracket highlighting for tomorrow-night theme (chmllr)
* FIX: don't let line-height 0 destroy the editor (Morgawr)
* FIX: plugins no longer require a restart
* FIX: when user-dir and core contain the same plugin version, choose user-dir first
* FIX: copy over platform specific dir for mac build (mark.fisher)
* FIX: show an error of sourcing for the path fails on OSX (ndr-qef)
* FIX: select-all now correctly includes the first line (mihneadb)
* FIX: check for curl in the linux build script (mihneadb)
* CHANGE: behaviors that have been removed with :- will guarantee that the behavior is not applied to anything with that tag.
* ADDED: You can remove recent workspaces (mortalapeman)
* ADDED: paths like foo.html.erb are now correctly interpreted as their file type
* ADDED: notifications can now be set with custom timeouts (ndr-qef)
* ADDED: pmeta-9 and alt-9 now go to the last tab (mihneadb)
* ADDED: Using auto-pairing with a selection now wraps the selection in the pair (ThePawnBreak)
* ADDED: Suggest an extension in the save-as dialog (ndr-qef)
* ADDED: Support alt-# tab switching (mihneadb)
* UPDATED: Move to wrench 1.5.6 (heyLu)

##0.6.2

* FIX: styling bug that caused light themes to be unusable

##0.6.1

* FIX: build instructions for all platforms. Add in build scripts for each.
* FIX: active line in solarized theme (Gozala)
* FIX: re-enable workspace behavior diffs
* FIX: Plugins should not say they need an update if there's no version available on the server
* FIX: Read keymaps safely so that errors are reported.
* FIX: remove readlink -f from the mac startup script
* FIX: provide skin/theme shold work correctly now (joshuafcole)
* FIX: Catch errors while walking the file system (zoranzaric)
* FIX: look in 64bit dirs first in the linux64 run script and add other dirs to fix openSUSE (wesleywiser)
* FIX: line-endings were not being added correctly to the ends of files.
* FIX: set the default screen size to be smaller so that LT doesn't open off screen
* FIX: type in plugin dialog (rmunn)
* FIX: Add SQL file type back in
* FIX: External browsers don't disconnect correctly
* FIX: remove inconsistencies in the plugin manager
* FIX: pmeta in :- keymaps didn't work
* FIX: better error handling in the local client
* FIX: make functions return correctly from external browser connections
* FIX: add LightTable.app to .gitignore (DomKM)
* FIX: dramatically better line numbering styles for the default theme
* FIX: line numbers now correctly size and stay right-aligned.
* FIX: remove use of rtl that causes very weird file name display behavior in navigator.
* CHANGE: Auto-complete is now auto-show by default
* ADDED: lt.objs.plugins/find-plugin for use in finding the current plugin dir
* ADDED: `Console: set buffer size`
* ADDED: Code folding with `Editor: fold code at cursor` command (efuquen)
* ADDED: travis-ci (sieben)
* ADDED: set the save dialog's first location to a sensible path (can3p and ndr-qef)
* ADDED: .zsh and .zshrc file extensions
* ADDED: `App: Disable metrics` behavior
* ADDED: LiveScript file type
* ADDED: platform specific startup scripts
* ADDED: typing : in a keymap or behavior file will now complete based on the command/behavior id
* ADDED: `Editor: Toggle line wrapping` command for one off wrapping
* ADDED: Tabsets are now styled as active
* ADDED: The body gets an "active" class when the window is focused
* UPDATED: Latest codemirror
* UPDATED: CLJS 2138

##0.6.0

* ADDED: Light Table is now open source
* ADDED: Plugins!
* ADDED: Plugin manager via `Plugins: Show plugin manager`
* ADDED: `Plugins: Submit a plugin` command
* ADDED: Split all the languages into separate plugins
* ADDED: Beautiful new default theme
* ADDED: All user settings/plugins are now stored in user data
* ADDED: Performance tweaks that should make everything faster
* ADDED: `Editor: Jump to definition at cursor` command
* ADDED: `Editor: Jump back to where you jumped from` command
* ADDED: `Editor: On change execute command` behavior
* ADDED: `Editor: Set CodeMirror flags` behavior
* ADDED: `Editor: Disconnect clients attached to editor` command
* ADDED: `Editor: Open current file in browser` command #956
* ADDED: You can now drop folder/files onto the workspace tree
* ADDED: a popup asking if you want to update when one is available
* ADDED: the statusbar is now in it's own container with find on top of it.
* ADDED: more hints for the starting state of no workspace
* ADDED: Jump to definition, and syntax aware autocomplete for Clojure and ClojureScript
* ADDED: `Style: Provide editor theme` and `Style: Provide skin` behaviors so that theming can be done via plugin
* ADDED: all editors are now backed by first class documents
  - mac: ~/Library/Application Support/LightTable
  - linux: ~/.config/LightTable
  - windows: %APPDATALOCAL%/LightTable
* CHANGE: All behaviors that were previously `lt.objs.langs.*` are now `lt.plugins.*`
* CHANGE: `lt.objs.langs.clj` is now `lt.plugins.clojure`
* CHANGE: Emacs and Vim are now both plugins to be downloaded via the plugin manager
* FIX: better LT stacktraces
* FIX: multiple popups won't drop focus as they're closed now
* FIX: Highlight line is now much faster
* FIX: scrolling in the command and navigate panes should be orders of magnitude faster.
* FIX: Auto-complete is now *significantly* faster
* FIX: \r\r\n at the end of files on windows #912
* FIX: :searcher.replace/:searcher.replace-all are missing #949
* FIX: Light Table won't open files if editor's for removed files remain #941
* FIX: Console sized to zero #932
* FIX: cljs connection broken with latest CLJS #932
* FIX: html eval isn't refreshing the browser #929
* FIX: Wrap resets after changing tab #905
* FIX: can't connect to nrepl in android project #902
* FIX: The mac .app is now fully self-contained
* FIX: Tons of clean up to prepare to open source
* UPDATED: Latest node-webkit
* UPDATED: Latest CodeMirror
* UPDATED: Latest vim/emacs mode

##0.5.20

* FIX: workaround for tools.reader dependency issues in Clojure projects

##0.5.19

* FIX: merge :repl-options :init correctly if it's in your project.clj
* FIX: nodejs require failed with certain module loading patterns
* FIX: with the nodejs client you couldn't use a pathless file as a repl
* FIX: tag specificity ordering bug
* FIX: typing very fast after bringing up the findbar would sometimes cause it to overwrite input
* FIX: correctly catch assertion errors #590
* FIX: Linux start script doesn't handle symlinks well #885
* FIX: Rest args in anonymous functions don't work #569, #256, #779, #881
* ADDED: :verbatim option to eval.custom
* ADDED: copy/paste using browser tab context menu
* ADDED: xml file type
* ADDED: :editor.keys.hinting.active tag to allow you to override hinting keybindings
* ADDED: plugins can be loaded from the plugins/ dir
* ADDED: __ID__ and __SELECTION\*__ for custom watches
* UPDATED: CodeMirror vim mode
* UPDATED: latest CodeMirror
* UPDATED: CLJS 2030
* UPDATED: lein-light-nrepl 0.0.8

##0.5.18

* FIX: timing issue with focusing the right-side panes where some keys could get dropped.
* FIX: OSX Mavericks codesigning issue.

##0.5.17

* ADDED: `Eval: Eval custom expression in editor` command
* ADDED: `Editor: Custom watch selection` command
* ADDED: edn as a file type
* ADDED: `Editor: Select line` command
* UPDATED: lein-light-nrepl 0.0.6

##0.5.16

* FIX: paredit didn't correctly handle tokens with one character at the end of a line
* FIX: alt-key bindings on Linux don't work #863
* FIX: python watches were broken in certain cases #856
* FIX: try to pick up proxy settings for downloading updates #841
* FIX: folder already renamed popup doesn't go away #855
* CHANGED: In vim mode ",/" is no longer bound to :nohlsearch
* ADDED: Clojure mode can now color (comment ...) forms as comments. Use the `Clojure: Highlight comment forms as comments` behavior
* ADDED: `Vim: :nohlsearch` command
* ADDED: `Instarepl: set start content` behavior, set it to "" to remove the intro. #827

##0.5.15

* FIX: if no documentation is found report that in the statusbar and don't show empty blocks
* FIX: requesting docs from a Clojure file outside of a project doesn't load in Clojure.core
* UPDATED: lein-light-nrepl 0.0.6

##0.5.14

* FIX: only Clojure/ClojureScript should currently have the `:docable` tag
* FIX: css bug that causes doc search to disappear

##0.5.13

* FIX: Clicking the connections menu item should toggle the connections pane
* ADDED: Parameter help for the `App: Run command on start` behaviors
* ADDED: Inline documentation for Clojure/ClojureScript (right click, or `Docs: Toggle documentation at cursor`)
* ADDED: Documentation search for Clojure/ClojureScript (view -> Language docs, `Docs: Search language docs`)
* ADDED: Julia syntax highlighting
* UPDATED: lein-light-nrepl 0.0.5

##0.5.12

* FIX: Don't try to handle keys without full information #849
* ADDED: `App: Run commands on start` behavior to let you run whatever when LT is opened. I.e. make full screen, toggle the workspace tree, etc.

##0.5.11

* FIX: Paths with spaces prevent the Clojure client from working on windows
* FIX: remote nRepl prints weren't always reliable
* FIX: in remote nRepls it was possible to try to send to disconnected clients
* UPDATED: lein-light-nrepl 0.0.4

##0.5.10

* FIX: Watches would send to the wrong client in some remote nrepl scenarios

##0.5.9

* FIX: when you remove the expression being watched, remove the watch
* FIX: don't expand watches when you type to the left or right of them
* FIX: Opening the docs and then closing them will close the created tabset if it's the only tab in it
* FIX: Allow both {:- {:app ["key"]}} and {:- {:app {"key" [..]}}} for keymap removal
* FIX: iPython figures now auto-close
* ADDED: Evaling a file or multiple expressions in python will now return results for each expression found
* ADDED: Basic paredit commands! `Paredit: Grow right`, `Paredit: Grow left`, `Paredit: Shrink right`, `Paredit: Shrink left`, `Paredit: Select expression`, `Paredit: Clear selection and return cursor`

##0.5.8

* FIX: On Windows using a menu item would eventually cause a crash.

##0.5.7

* FIX: Exceptions in menu items can theoretically crash LT. #837
* FIX: Remove unicode BOM on file open #826
* FIX: Failed saves popup a warning #519
* FIX: behavior specificity ordering issue
* FIX: properly escape searcher results #834
* FIX: allow ctrl-space to be overridden on mac #835
* FIX: in the case of constant nrepl messages some would occassionally get dropped
* CHANGED: don't enable highlight line by default, due to performance issues
* ADDED: `App: add to the global ENV for processes` behavior that merges a map of vars into the environment when clients are started.
* ADDED: try to reflect keybindings in menus on OSX
* UPDATED: latest CodeMirror

##0.5.6

* FIX: handle massive numbers of messages from nrepl without blocking
* ADDED: Clojure prints can now stream, allowing you to (print) and see the result without flushing.

##0.5.5

* FIX: allow skins to use the default scrollbar style
* FIX: println does not work in console when called from Compojure routes fixed in latest #808
* FIX: LightTable 0.5.4 from archive not starting on Linux 64-bit fixed in latest #810
* FIX: some shortcuts don't work properly fixed in latest #802
* FIX: print does not behave like println or pprint fixed in latest #812
* FIX: Unable to load org.clojure/core.memoize library 0.5.3+ fixed in latest #794
* FIX: Unable to set! *unchecked-math* fixed in latest #804
* FIX: Watches triggered from outside their own namespace do not update #817
* FIX: Emacs mode doesn't allow tab auto-completion #768
* CHANGED: Clojure clients now use nREPL
* ADDED: Connect to a remote nREPL server

##0.5.4

* FIX: Save-all is saving un-modified files #771
* FIX: Allow spaces in paths for clients #773
* FIX: "[" then space causes "[[]]" #774
* FIX: Next tabset doesn't work with instarepl #782
* FIX: No protocol-IDeref when pressing escape #784
* FIX: System/out doesn't print to the console #785, #587
* FIX: Can't bind ctrl-- #793
* FIX: when watching expressions that return "<...>" values aren't shown #789
* FIX: Indent settings wasn't correctly respecting use-tabs. #772, #487
* ADDED: `Instarepl: Toggle live mode` command
* ADDED: `Workspace: Show workspace on start` behavior #769

##0.5.3

* FIX: logging on inline browser wasn't always showing inspectables
* FIX: Asserts do not correctly show as errors #767
* FIX: Workspace inline rename not full width #758
* FIX: Watches don't work in the instarepl #753
* FIX: Horizontal scroll overlays line numbers (ibdknox theme) #751
* FIX: Exiting findbar with no editors open causes errors #747
* FIX: Separate fill selection from find #742
* FIX: Keymaps should be modifier order insensitive #739
* FIX: Vim re-indent '=' doesn't work with multiple lines #732
* FIX: Watches in Python #730
* FIX: SyntaxError when file encoding is explicitly specified #454
* FIX: Emacs mode auto-complete doesn't allow tab
* ADDED: `Editor: Allow scrolling past the end of the file` behavior
* ADDED: `Editor: Save on focus lost` behavior (add to the :window tag)
* ADDED: `Editor: Save all on focus lost` behavior (add to the :window tag)
* ADDED: `File: Save all` command
* ADDED: `Editor: Clear all watches` command #743
* ADDED: `Find: Fill selection` command

##0.5.2

* FIX: auto-update wasn't correctly handling version
* FIX: include latest lein-light clojure client
* FIX: a couple of issues with light skin
* FIX: clicking on the auto-completer doesn't complete

##0.5.1

* FIX CRASH: Chromium crashes on pasting in a standard input on OS X
* FIX: require not defined evaluating file with no ns macro #726
* FIX: Unable to set! \*warn-on-reflection\* #725
* FIX: Cannot recover from LT window maximize #724
* FIX: Don't bind ctrl-shift-right/left by default #723
* FIX: make instarepl fails even for clojure files #721
* FIX: filter lists don't ensure the selection is visible #719
* FIX: Invalid user behaviors prevents the app from starting #717
* FIX: Cmd-G not correctly bound in the find-bar #704
* FIX: Missing shebang in ./LightTable for linux #701
* FIX: Eval of clj files will fail without an namespace #700
* FIX: Escape in goto line should close command panel #696
* FIX: Set behaviors and keymaps to show auto complete on input
* FIX: remove toggle line numbers and toggle whitespace commands
* FIX: remove refresh light table command
* FIX: remove spurious print on startup
* FIX: remove spurious prints in python client
* FIX: watches require you to manually import sys
* FIX: move to IPython 1.0+
* FIX: windows 8 pops up command prompts on start
* ADDED: Ctrl-tab as a default keybinding for switching tabs
* ADDED: File -> Open folder menu item
* UPDATED: node-webkit 0.7.2

##0.5.0

* ADDED: behaviors files to modify LT's behavior
* ADDED: behaviors helper for easily modifying behaviors files
* ADDED: keymap files to bind keys
* ADDED: keymap helper for easily modifying keymaps
* ADDED: full set of editor commands from codemirror
* ADDED: auto-complete on text input behavior
* ADDED: global PATH setting behavior
* ADDED: behavior to specify the Python/IPython exes
* ADDED: behavior to specify the Java exe to use for Clojure
* ADDED: project-wide search (searcher)
* ADDED: project-wide replace
* ADDED: watches for Clojure, ClojureScript, Python, Javascript
* ADDED: ability to specify a series of commands to run on keypress in keymaps
* ADDED: keyboard Chords
* ADDED: CLI for OS X and Linux
* ADDED: standard menus
* ADDED: JSHint behvaiors
* ADDED: Emacs mode
* ADDED: rainbow parens behaviors
* ADDED: clojure print-length behavior to prevent infinite seqs from looping
* ADDED: background processing
* ADDED: workspace-specific behaviors (per workspace settings)
* ADDED: behavior to disable animations
* ADDED: behavior to open a new file on start instead of the welcome screen
* ADDED: replace
* ADDED: console count indicator
* ADDED: visible whitespace behaviors
* ADDED: vim key mapping behavior
* ADDED: custom file-type declaration behavior
* ADDED: on save ensure last char is a newline behavior
* ADDED: console context menu
* REDESIGN: remove ever-present left-menu
* REDESIGN: navigate is much more user-friendly
* REDESIGN: commands now show keyboard shortcuts under them
* REDESIGN: cleaner dark and light skin
* FIX: dramatically simplified deployment (no more ~/.lighttable), all directory local
* FIX: numerous small consistency issues
* FIX: many small performance improvements
* FIX: workspace/file watching is now much more efficient
* FIX: large workspaces will no longer freeze LT
* FIX: clojure instarepl is now much more reliable
* FIX: clojure instarepl errors are a single line and can be clicked to expand
* FIX: inline results are height constrained and scroll if necessary
* FIX: skins are now variablized to make it easy to modify colors
* FIX: focus issues with browsers
* FIX: international keyboard handling
* FIX: find (next|prev) now works correctly across tabs
* FIX: find bar can no longer end up floating over the editor
* FIX: workspace disappears on refresh/crash #639
* FIX: pressing cmd-delete can cause LT to hang #604
* FIX: files should open in the active window #628
* FIX: browser tabs should have the webpage title as their tab name #643
* FIX: cannot see full path in tab hover #463
* FIX: LT crashes pressing the menu key twice #591
* FIX: cursor/line mismatch #356
* FIX: syntax error when encoding is specified in python #454
* FIX: workspace entries are not scrollable #683
* FIX: EDN tagged data literals should work #554
* FIX: watching invalid files #651
* FIX: recursive symlinks causes issues with file watching #658
* FIX: impossible to copy text out of the instarepl results #650
* FIX: shebang in JS errors out #656
* FIX: python doesn't report errors on start #646
* FIX: rename in the workspace tree doesn't correctly set the new syntax
* FIX: `move tab to next tabset` caused weird "unknown" tab to appear
* FIX: disable the GPU-blacklist
* UPDATED: latest codemirror and modes
* UPDATED: node-webkit 0.7.0
* UPDATED: lastest clojurescript

##0.4.12

* FIX: unicode issues in Python results. #546
* FIX: properly chunk Python responses so very large responses are fully recieved.

##0.4.11

* FIX: Browser JS eval on windows

##0.4.10

* FIX: on background delete don't recalculate the entire workspace (monitoring performance)
* FIX: fix "TypeError: Cannot call method 'indexOf' of undefined" during background delete
* FIX: filter version check url timeouts from the console
* FIX: really long return values throw parse errors.

##0.4.9

* FIX: bad push of 0.4.8

##0.4.8

* FIX: TCP message splitting issue #575
* FIX: ipython on windows issues #576

##0.4.7

* FIX: ContentWindow vs window distinction #571
* FIX: Race condition that caused cljs to intermittently fail #559

##0.4.6

* FIX: Refresh browser is hard-bound to cmd-R instead of meta-R #560
* ADDED: added in Sass highlighting (#493 related)
* ADDED: Comment, uncomment, and toggle comment line(s) commands #355, #540
* ADDED: Indent, unindent, and smart indent line(s) commands
* ADDED: Commands for zoom in, zoom out, zoom reset for the LT window
* UPDATED: Vim mode
* UPDATED: All CodeMirror language modes

##0.4.5

* FIX: have clojure.test/\*test-output\* show in the console
* FIX: force disabling the cache #538
* FIX: bugs in search #525
* FIX: responses larger than a single tcp frame aren't handled properly #539
* FIX: auto-detect line endings was replacing "\r\n" with "\n" #359

##0.4.4

* FIX: remove spurious print

##0.4.3

* FIX: add /etc/paths to path discover for OSX
* FIX: html eval stopped working
* FIX: don't self-pair if prev char is the same #508
* FIX: url bar doesn't reflect hash change. #501
* FIX: if there isn't a browser available on HTML eval, create one
* FIX: auto-complete after . and no typing will insert at the top of the file
* FIX: exclude pattern check didn't include / for dirs
* FIX: windows doesn't have all the unicode arrows #450

##0.4.2

* FIX: Incorrectly interpreting "//" as a regex for find #499
* FIX: toggle remove whitespace caused save issues #479
* FIX: discover the PATH in OSX when run GUI-wise
* ADDED: VirtualEnv support for Python and IPython

##0.4.1

* FIX: Eval an empty line in Python throws #480
* FIX: NodeJS require issues #448, #485
* FIX: Python 3 issues #467
* FIX: File encoding in Python throws #454
* FIX: Missing connecting loader.gif
* FIX: CLJS eval with ^:export is broken #484
* FIX: Use pre's for stdout #474
* FIX: Screen jumps when you click on certain links #461
* FIX: Platform error when clicking download link #447
* FIX: Single quotes break js eval #449
* FIX: Segfault on linux when right clicking on results #478
* FIX: File events were unhooked from the editor pool #446
* FIX: Browser reload throws when you remove a browser tab #477
* FIX: Connect to external browser is broken #459
* FIX: .pyw scripts are not recognised as python #489

##0.4.0

* FIX: change bundle id for Mac .app
* FIX: make the fuzzy matching take separators into account
* FIX: setting the exclude path didn't take effect until restart
* FIX: remove errant print statement (#405)
* FIX: pipe separator highlights (#406)
* FIX: dramatically improve rendering performance.
* FIX: correctly parse version parts to numbers for comparison.
* FIX: set syntax needed a better error message and description (#388)
* FIX: better searching of the PATH on windows
* FIX: don't fail startup if a file/folder in a workspace was deleted
* FIX: default exclude pattern was too greedy
* FIX: handle semi-colonless JS much better
* FIX: remove the tab symbols from the solarized theme
* FIX: workspace buttons no longer overflow
* FIX: handle the no available client much more gracefully
* ADDED: the ability to split the window into multiple tabsets
* ADDED: you can now have multiple windows open (Cmd/Ctrl-Shift-N to open a window, Cmd/Ctrl-Shift-W to close)
* ADDED: python eval!
* ADDED: ipython client integration
* ADDED: nodejs client
* ADDED: browser tab `Browser: add browser tab`, `Browser: refresh active browser tab`
* ADDED: browser client using chrome-devtools
* ADDED: Magical JS VM patching for live updates through the devtools integration
* ADDED: command grouping
* ADDED: connect tab that now shows which clients are active
* ADDED: you can now unset a client from an editor
* ADDED: connect tab now has `add connection` that lists all available client types
* ADDED: executing a command by name with a keybinding will prompt you with the keybinding
* ADDED: token-based auto-complete (press tab after a character)
* ADDED: trailing whitespace is now removed on save (use the `toggle remove trailing whitespace` command to disable)
* ADDED: line-ending detection on save
* ADDED: You can now eval any arbitrary selection, just select text and press cmd/ctrl+enter
* ADDED: Better styling for filter lists
* ADDED: greatly improved startup time
* ADDED: new folder, new file, rename, and delete to workspace context menu
* ADDED: workspaces now watch the file system for changes
* ADDED: Inline inspectable results for Javascript
* ADDED: Console inspectable results for Javascript
* ADDED: A greatly improved console with source information
* ADDED: You can now put the console in a tab via the `Console: Open the console in a tab` command
* ADDED: cancelable eval for Clojure and Python
* ADDED: editor context menu for cut/copy/paste
* ADDED: Light Table Docs! `Docs: Open Light Table's documentation`
* ADDED: Recent workspaces are remembered, added `Workspace: Create new workspace`
* CHANGED: clients tab is now `connect`
* CHANGED: moved to acorn for Javascript parsing instead of Esprima
* CHANGED: completely remove JQuery for significant memory performance increases
* UPDATED: latest codemirror

##0.3.9

* CHANGE: set the default theme to something with a bit more color
* FIX: tab did not correctly indent with a selection
* FIX: tab was not correctly inserting tabs when use tabs was on.
* FIX: servers are per window using random open ports (fixes EADDRINUSE)
* FIX: add hover state for instarepl live button
* FIX: when switching live on and off in the instarepl, clear results
* FIX: instarepl live toggle refocuses the editor
* FIX: don't insert paired brace if the next char is a word character
* ADDED: scss mode
* ADDED: `ibdknox` theme, which is the previous default theme
* UPDATED: lots of the codemirror modes

##0.3.8

* FIX: (:use [blah a b c]) in the instarepl
* FIX: " wasn't being paired correctly
* FIX: removing a tab before the active would incorrectly show content
* FIX: try to handle the AltGr key on international keyboards.
* ADDED: Cmd/Ctrl-F while find is open will replace the search with selection if there is one

##0.3.7

* FIX: valid clojure NS forms failed in the instarepl (use a custom version of the analyzer)
* FIX: auto-expand tabs when indent behavior is set to spaces
* FIX: fully kill everything on shutdown to try and isolate the OSX address in use bug
* ADDED: `set tab size/behavior` command
* ADDED: you can now provide options when binding keys
* ADDED: remove button when hovering over a binding in the keybinding interface
* ADDED: the keys input for key binding is now a capturing-input

##0.3.6

* FIX: workspace sometimes incorrectly filters out files

##0.3.5

* FIX: windows clients were broken due to double forward-slashes

##0.3.4

* FIX: Cmd/Ctrl-F now pre-fills the selection if there is one
* FIX: update clojure mode to have the latest builtins from 1.5
* FIX: remove conflict with people using tools.reader
* FIX: doto was broken in the instarepl
* FIX: remove aggressive macro expansion in the instarepl
* FIX: instarepl didn't respond to the `save file as` command
* FIX: Give a meaningful error when Clojure version is < 1.4.0
* ADDED: window size, position, and fullscreen are now remembered
* ADDED: clients now spawn normal lein processes (allows for setting memory, local-repo, etc)

##0.3.3

* FIX: clicking on the side tabs doesn't focus content when opened via mouse.
* FIX: Clojure 1.5.0 support
* FIX: instarepl live button has wrong cursor
* FIX: instarepl + line numbers hides the reader error box
* ADDED: much faster, much more robust fuzzy searching

##0.3.2

* FIX: keybinding command-list was broken in 0.3.1

##0.3.1

* FIX: you can copy/post in vim insert mode with Ctrl-C/Ctrl-V
* FIX: "Make current editor an[d] instarepl" typo fix
* FIX: file dialogs would sometime have no effect
* FIX: save would intermittently do nothing because the element was GC'd
* FIX: exclude pattern when walking directories (ignores \..\* and others)
* FIX: right-click closing a tab caused file to be unopenable
* FIX: new file without changes + save correctly reports name change
* FIX: version checking guard against redirects
* FIX: Custom set themes were not loaded on restart
* FIX: Ctrl-F was incorrectly bound by default
* FIX: bind keys per platform (on mac Cmd-[something] on everything else Ctrl-[something])
* FIX: line numbers were reported at 0, they are now indexed from 1
* ADDED: commands for eval, eval.one, tab navigation, pair characters
* ADDED: `Set line height` command
* ADDED: save-as (Cmd/Ctrl-S)
* ADDED: configurable exclude pattern, via `set exclude pattern/filter` command
* ADDED: you can now drag and drop files onto LT to open them.
* ADDED: set a Clojure file's namespace to user if there isn't one (helps newcomers!).

##0.3.0

* ADDED: You can eval JavaScript in a browser!
* ADDED: CSS "eval"
* ADDED: new visuals
* ADDED: workspace treeview
* ADDED: Fuzzy navigation pane (Cmd/Ctrl-O)
* ADDED: Clients pane for client management
* ADDED: Command fuzzy search (Ctrl-Space)
* ADDED: Vim mode
* ADDED: key binding UI
* ADDED: goto line (Cmd/Ctrl-L)
* ADDED: You can make a file into an instarepl and save instarepls
* ADDED: set syntax command
* ADDED: inline instarepl results
* ADDED: env var for home (LTHOME)
* ADDED: options to disable auto update (:no-update)
* ADDED: new bottom console that shows prints
* ADDED: print statements are now asynchronous
* ADDED: tab reordering
* ADDED: Context menus for results, tabs, and workspace
* ADDED: native save/open dialogs
* ADDED: better find
* ADDED: status bar loading/working indicator
* ADDED: line / column status
* ADDED: resizable side pane and bottom console
* ADDED: Create an empty new file (Cmd/Ctrl-N)
* ADDED: Any arbitrary editor's content can be saved
* ADDED: new eval system
* ADDED: new inline results and errors experience
* ADDED: Set font face
* ADDED: themes and skins list for change commands
* ADDED: working indicators for instarepl
* FIX: popups now respond to keyboard input (arrows and tab/shift-tab)
* FIX: tabs overflow in a reasonable way now
* FIX: editor themes don't do weird things with font
* FIX: Instarepl now reports that it is dirty and prevents closing
* FIX: correctly report the location of reader errors
* FIX: numerous improvements to the reliability of CLJ/CLJS eval
* FIX: The binary is now signed for OSX
* UPDATED: move to the latest blind (now tools.reader)

##0.2.7

* FIX: fix incorrect indenting of {} in clojure/clojurescript
* FIX: hang on windows when trying to connect to a path without a project.clj

##0.2.6

* FIX: fix instarepl's out only printing when there's a new line at the end.

##0.2.5

* FIX: issue with starting a client in windows with a space in the path
* FIX: canonical source for internal version info is now version.json
* FIX: instarepl would sometimes show an error about the from property
* FIX: no longer use a special version of Clojure in lein-light, thanks to bronsa/blind (AWESOME)
* FIX: instarepl placement issues when a bare symbol is preceeded by multiple blank lines
* FIX: infinite seqs as params would kill the instarepl
* FIX: certain forms like (and) would stop evaluation in the instarepl
* FIX: escaped chars would screw up highlighting, e.g. \" or \)
* UPDATE: move to the official release of codemirror v3
* ADDED: you can now eval @some-atom, [vec stuff], {:some map}
* ADDED: starting a client will now search upward for a project.clj

##0.2.4

* FIX: initialization sequence that would cause skin to be loaded before deploy
* FIX: redo the instarepl to remove the || hack and use marks
* UPDATE: move to a newer version of the clojure mode
* ADDED: new theme tomorrow-night
* ADDED: handle OS file opens by showing an editor and no welcome screen

##0.2.3

* FIX: update mechanism was using mod time for freshness comparison
* FIX: changes to the core loading script require a binary update

##0.2.2

* FIX: light themes now correctly set their background color
* FIX: find allows spaces in search terms
* UPDATE: updated to a much better version of the solarized theme use `set theme solarized light` or `set theme solarized dark`
* ADDED: set theme [theme] now applies immediately to all open editors
* ADDED: set line-numbers [true|false] now applies immediately to all open editors
* ADDED: set skin [dark|light] changes the chrome of LT to be either a dark or light theme

##0.2.1

* FIX: console.log on uncaught exceptions crashes the app
* FIX: two eval responses coming in at the same time caused a JSON parse error due to the new line separation
* FIX: start clients in the project directory to make sure paths are correct
* FIX: undo will no longer remove the file's content
* FIX: find works from the commandbar and should work with all editors, including the instarepl
* FIX: gracefully handles when the settings file doesn't exist
* FIX: save dialog has more obviously intentioned buttons
* FIX: windows pathing issues that prevented drives other than C:\ from being shown
* FIX: dramatically speed up eval
* FIX: settings were being replaced on each invocation due to a constant re-deploy bug
* FIX: prevent multiple instances of the app from opening, causing address in use issues
* FIX: spurious update messages when off the network
* UPDATE: moved to codemirror v3
* UPDATE: moved to node-webkit 0.3.5
* ADDED: you can now open files from the OS with LT
* ADDED: version command to see change log and version info
