# Help

For questions and community discussion, please drop them in the [Light Table Google group](https://groups.google.com/forum/#!forum/light-table-discussion). Also check out #lighttable in Freenode IRC.

# Bugs

When filing a bug on GitHub, please help us help you by including the following:

* *Steps to reproduce the bug.*
* Your operating system, LT and relevant plugin versions.
* Relevant configuration in your user.keymap and user.behaviors.
* Error messages you see in your console. In your menu, select`View > Commands` and then search for and execute the `Console: Open the console in a tab` command. Go to the console tab and copy and paste its errors.

Note: The issue tracker is for LightTable bugs. Bugs for a specific language should go in its plugin repository e.g. [Clojure](https://github.com/LightTable/Clojure/issues), [JavaScript](https://github.com/LightTable/JavaScript/issues) and [Python](https://github.com/LightTable/Python/issues). Questions should be asked on the [Light Table Google group](https://groups.google.com/forum/#!forum/light-table-discussion).

# Feature Requests

If a feature is specific to a library, language or is something that is normally a plugin in other editors, please add it to [the wishlist](https://github.com/LightTable/LightTable/wiki/Feature-wishlist).
For other features, feel free to discuss in an issue. Be aware that Light Table has a plugin system that has the same degree of power that any core code does. This means that as a user, you usually have the ability to add any feature you desire without waiting on Light Table to implement it! Having such a powerful plugin system allows us to keep a small, well maintained Light Table core while encouraging a large ecosystem of plugins.

# Contributing

Hello! Thanks for your interest in Light Table. Things you can do to make Light Table even more awesome :sunrise: :koala: :exclamation:

* `Answering issues`: See the [answering issues guide](https://github.com/LightTable/LightTable/wiki/For-Contributors#answering-issues).
* `Code contributions`: See [section below](#code-contributions).
* `Improving docs`: Check out [these documentation issues](https://github.com/LightTable/docs.lighttable.com/issues). Reading the [official docs](http://docs.lighttable.com/) and checking for errors, typos, etc. would also be great.

## Code Contributions
_By contributing code to Light Table, you are agreeing to release it under the MIT License._

If it's your first time contributing, we'd love to have you :). Be sure to check out our [contributing tutorial](https://github.com/LightTable/LightTable/wiki/First-Contribution).

When contributing:

* [Check out issues](https://github.com/LightTable/LightTable/issues?q=is%3Aopen+is%3Aissue+label%3Abeginner) that are ready to be worked on. Feel free to ping a contributor if you need help along the way.
* For any other contributions, please discuss with us as early as possible. We want your hard work to count.
* Please add docstrings to non-trivial functions that are added. Most existing code doesn't have this but we'd like to improve this.
* We are not currently seeking refactoring contributions or code convention tweaks e.g. whitespace. This may change at a later point when we have automated tests and an explicit code convention.
* We are not seeking contributions to script/ or deploy/ (core team only)
* For contributions to a [vendored dependency](doc/for-committers.md#node-packages), they must be sent upstream and then we can update to the new version.
* For plugins and files that come from CodeMirror, usually under codemirror/, we do not take pull requests.
  Instead, send a pull request [to CodeMirror](https://github.com/codemirror/CodeMirror). Once they release a new version we can
  upgrade it on a plugin. Thanks!
