# Light Table [![Build Status](https://travis-ci.org/LightTable/LightTable.svg?branch=master)](https://travis-ci.org/LightTable/LightTable)

Light Table is a next generation code editor that connects you to your creation with instant feedback. Light Table is very customizable and can display anything a [Chromium browser](http://www.chromium.org/) can.

## Downloads

Prebuilt binaries are available through [lighttable.com](http://lighttable.com). To build and use a developer version of Light Table [see these instructions](doc/developer-install.md).

### Note for OS/X 10.10 (Yosemite) Users

Please note that a bug in node-webkit currently causes performance problems in Light Table on OS/X Yosemite. Yosemite users can build Light Table for the forthcoming version based on atom-shell by [following these instructions](https://groups.google.com/d/msg/light-table-discussion/PfQ6kCKrj84/hMNG7flMoZkJ), but please note that the atom-shell version is not yet stable.

## Documentation

* See [docs.lighttable.com](http://docs.lighttable.com/) for official user documentation and tutorials.
* See the [community wiki](https://github.com/LightTable/LightTable/wiki) which includes a [User FAQ](https://github.com/LightTable/LightTable/wiki/FAQ) and a [For Users page](https://github.com/LightTable/LightTable/wiki/For-Users) for additional links.
* For a typical Light Table workflow, [read this](doc/workflow.md).
* To understand how Light Table works, read about its [BOT architecture](doc/BOT.md).
* If you're a user coming from vim or emacs see the [For Vim Users](https://github.com/LightTable/LightTable/wiki/For-Vim-Users) and [For Emacs Users](https://github.com/LightTable/LightTable/wiki/For-Emacs-Users) guides.

## Plugins

Light Table has a powerful plugin system that allows almost any aspect of the editor to be extended and customized. With over [100+ plugins](https://github.com/LightTable/plugin-metadata), the community is able to offer eval support for new languages, create domain-specific IDEs and much more. If you're interested in writing your own plugin, see the [Write a Plugin](http://docs.lighttable.com/#write-a-plugin) and [Submit a Plugin](http://docs.lighttable.com/#submit-a-plugin) docs. For an example ClojureScript plugin, see [LightTable-Declassifier](https://github.com/LightTable/LightTable-Declassifier).

## Community

Want to ask a question or just say hi? Please do :). Our mailing list is the [Light Table Google group](https://groups.google.com/forum/#!forum/light-table-discussion). We also hang out in `#lighttable` on Freenode IRC.

## For Developers

LightTable is primarily written in [ClojureScript](http://clojure.org/clojurescript). If you aren't familiar with it, check out [David Nolen's tutorial](https://github.com/swannodette/lt-cljs-tutorial).

In order to develop for Light Table, you will need to [install a developer version of Light Table](doc/developer-install.md). For more information, read [CONTRIBUTING.md](https://github.com/LightTable/LightTable/blob/master/CONTRIBUTING.md#code-contributions) and [For Developers](https://github.com/LightTable/LightTable/wiki/For-Developers).


## License

All files in this project are under the [LICENSE.md](LICENSE.md) license unless otherwise stated in the file or by a dependency's license file.
