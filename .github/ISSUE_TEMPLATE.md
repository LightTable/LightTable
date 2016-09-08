## *Issue Template*

This section covers general topics related to all issues, regardless of their subject.

Note that issues for this repo are for bugs with or feature requests for LightTable itself. Bugs or features for a specific language or other plugin should be submitted to their respective GitHub repo e.g. [Clojure](https://github.com/LightTable/Clojure), [JavaScript](https://github.com/LightTable/Javascript), or [Vim](https://github.com/LightTable/Vim).

Questions should generally be asked on the [Light Table Google Groups group](https://groups.google.com/forum/#!forum/light-table-discussion) or in [the Gitter room for the main GitHub repo](https://gitter.im/LightTable/LightTable).

Please check for an existing or similar issue that covers or is related to your issue before submitting a new issue.

Remove any sections in this template that aren't pertinent. Remove the instructions text too (including this section), please, before submitting this issue.

There are separate sections below for requesting a feature or reporting a bug. Edit the relevant sectiont to include the information requested. If you fail to include pertinent info, we're probably going to close your issue. But we'll gladly re-open it once you include the info we need to help you.

## Request a Feature

Start with a brief description of what behavior or capability you hope to achieve were the requested feature implemented. It's possible an existing feature, or a plugin, satisfies your requirements.

Include details about the feature.

Note whether you can contribute, and in what capacities, e.g. writing code, writing documentation, testing. Depending on the value you place on your own time, you may want to wait for feedback from the core contributors before beginning any work on adding or changing code.

Keep in mind that Light Table is developed and maintained by a small group of part-time volunteers so it's unlikely your request will be a high priority. Contributing pull requests with (working) code *greatly* increase the chances your feature will be implemented.

## Report a Bug

### Steps to Reproduce

 1. _
 2. _

In general, you cannot be *too* detailed. You don't need to include steps to start the computer, but it's fine to start with starting Light Table itself (unless, e.g. the bug is only observed when Light Table has already been open for some period of time), and it's *fantastic* for you to include every action or command, or even individual clicks or keypresses.

It's very difficult to fix a bug that we can't reproduce.

Ideally, include the *minimal* file or files for which you can reproduce the bug. If that's not feasible, including an (appropriately redacted) version of your actual file(s) is great too. If the bug isn't specific to any particular file, note that in this section.

### Environment

| Info                             | Details |
| -------------------------------- | ------- |
| Light Table version              |         |
| Operating system                 |         |

#### Relevant Plugins

| Plugin | Version |
| ------ | ------- |
|        |         |

#### Relevant Settings in your *user.keymap* and *user.behaviors* Files

*user.keymap*:

```
Paste relevant settings here
```

*user.behaviors*:

```
Paste relevant settings here
```

### Error Messages

Include all error messages shown in the Light Table console.

To access the console, open the command bar (by pressing <kbd>Ctrl</kbd>+<kbd>Space</kbd> or by opening the *View* menu and selecting *Commands*) and then search for and execute the *Console: Open the console in a tab* command. Go to the console tab and copy and paste any errors or other messages below.

```
Paste error messages here
```
