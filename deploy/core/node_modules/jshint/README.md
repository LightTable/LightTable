JSHint, A Static Code Analysis Tool for JavaScript
==================================================
[![Build Status](https://travis-ci.org/jshint/jshint.png?branch=master)](https://travis-ci.org/jshint/jshint)
[![NPM version](https://badge.fury.io/js/jshint.png)](http://badge.fury.io/js/jshint)

JSHint is a community-driven tool to detect errors and potential problems in
JavaScript code and to enforce your team's coding conventions. We made JSHint
very flexible so you can easily adjust it to your particular coding guidelines
and the environment you expect your code to execute in.

Our goal is to help JavaScript developers write complex programs without
worrying about typos and language gotchas.

We believe that static code analysis programs—as well as other code quality
tools—are important and beneficial to the JavaScript community and, thus,
should not alienate their users.

For general usage and hacking information, visit our website:
[http://jshint.com/](http://jshint.com/).

Bug Bounties
--------------------------------

Some bugs are so important to us, we will pay you if you fix them! Go to
[our page on BountySource](https://www.bountysource.com/#trackers/48759-jshint)
to see which bugs have bounties behind them.

Really want to have something fixed but don't have time? You can add your
own bounty to any JSHint bug and make it more attractive for potential
contributors!

**Rule:** A bug is considered fixed only after it has been merged into the
master branch of the main JSHint repository.

Reporting a bug
---------------

To report a bug simply create a
[new GitHub Issue](https://github.com/jshint/jshint/issues/new) and describe
your problem or suggestion. We welcome all kind of feedback regarding
JSHint including but not limited to:

 * When JSHint doesn't work as expected
 * When JSHint complains about valid JavaScript code that works in all browsers
 * When you simply want a new option or feature

Before reporting a bug look around to see if there are any open or closed tickets
that cover your issue. And remember the wisdom: pull request > bug report > tweet.


FAQ
---

#### How do I turn off "mixed tabs and spaces" warning?

If you're using so-called [smart tabs](http://www.emacswiki.org/SmartTabs)
then we have an option `smarttabs` for you. Otherwise, your solution is to
run JSHint with a custom reporter that discards any warnings you don't like.
For example, this [example reporter](https://gist.github.com/3885619)
discards all warnings about mixed tabs and spaces.

Contributing
------------

Look for a file named `CONTRIBUTING.md` in this repository. It contains our
contributing guidelines. We also have
[a mailing list](http://groups.google.com/group/jshint/).

License
-------

JSHint is distributed under the MIT License. One file and one file only
(src/stable/jshint.js) is distributed under the slightly modified MIT License.

Attribution
-----------

Core Team members:

 * [Anton Kovalyov](http://anton.kovalyov.net/) ([@valueof](http://twitter.com/valueof))
 * [Wolfgang Kluge](http://klugesoftware.de/) ([blog](http://gehirnwindung.de/))
 * [Josh Perez](http://www.goatslacker.com/) ([@goatslacker](http://twitter.com/goatslacker))
 * [Brent Lintner](http://brentlintner.heroku.com/) ([@brentlintner](http://twitter.com/brentlintner))

Maintainer: Anton Kovalyov

Thank you!
----------

We really appreciate all kind of feedback and contributions. Thanks for using and supporting JSHint!
