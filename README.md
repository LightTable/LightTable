Light Table Playground
======================

Issues and wiki for the Light Table Playground

#Changes

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
