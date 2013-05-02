Light Table Playground
======================

Issues and wiki for the Light Table Playground

#Changes

##0.4.2

* FIX: Incorrectly interpreting "//" as a regex for find #499
* FIX: toggle remove whitespace caused save issues #479
* FIX: discover the PATH in OSX when run GUI-wise
* ADDED: VirtualEnv support for Python and IPython issue #465

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

##Known issues for 0.2.0
* [mac] Doesn't work on 10.6 until I get a machine to compile it on
* [mac] Untaring updates is really slow due to a chromium event loop bug (doesn't impact editing)
* [linux] Frameless windows aren't resizable, so it is framed. Blocked by [chromium bug](http://code.google.com/p/chromium/issues/detail?id=156465)
* [win] Child processes bring up a command prompt that steals focus. Will be fixed with next shell release.
* [win] As a result of the above, java connection processes can sometimes live on after the app is closed.
* [all] No context menus - waiting to see what the impact of this is.
