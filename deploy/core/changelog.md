#Changes

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
