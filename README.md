# Light Table [![Build Status](https://travis-ci.org/LightTable/LightTable.svg?branch=master)](https://travis-ci.org/LightTable/LightTable)

[![Join the chat at https://gitter.im/LightTable/LightTable](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/LightTable/LightTable?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Light Table is a next generation code editor that connects you to your creation with instant feedback. Light Table is very customizable and can display anything a [Chromium browser](http://www.chromium.org/) can.

## Downloads

Prebuilt binaries are available through [lighttable.com](http://lighttable.com). To build and use a developer version of Light Table [see these instructions](doc/developer-install.md).

For OSX users, the install process involves the following steps until we officially sign our OSX App:

* In Finder, Ctrl-click on LightTable.app/ and select Open.
* When you see [this prompt](https://cloud.githubusercontent.com/assets/11994/11731454/85181e90-9f69-11e5-9c65-f6aa4228005c.png) about LightTable being unidentified, click Open.
* If Ctrl-click doesn't work for you, open System Preferences > Security & Privacy > General, temporarily change "Allow apps downloaded from:" to Anywhere and double click on LightTable.app.

## Documentation

* See [docs.lighttable.com](http://docs.lighttable.com/) for official user documentation and tutorials.
* See the [community wiki](https://github.com/LightTable/LightTable/wiki) which includes a [User FAQ](https://github.com/LightTable/LightTable/wiki/FAQ) and a [For Users page](https://github.com/LightTable/LightTable/wiki/For-Users) for additional links.
* For a typical Light Table workflow, [read this](doc/workflow.md).
* To understand how Light Table works, read about its [BOT architecture](doc/BOT.md).
* See [Light Table's API docs](http://lighttable.github.io/LightTable/api/index.html) to see what
  plugin authors have access to.
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

## Credits

Big thanks to all our [contributors](https://github.com/LightTable/LightTable/graphs/contributors)!
Thanks of course to Kodowa for all they have done for Light Table and also to Cognitect for providing friday contributions for one of the core team members.
