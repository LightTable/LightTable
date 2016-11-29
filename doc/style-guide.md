# LightTable Style Guide

Follow the [Clojure Style Guide](https://github.com/bbatsov/clojure-style-guide) unless directed otherwise below. The guide is comprehensive, well organized, and common.

In order to streamline pull requests, prior to opening one, consider running your code through a formatting tool such as [cljfmt](https://github.com/weavejester/cljfmt) or [kibit](https://github.com/jonase/kibit). They are handy for catching any deviations from standard Clojure/script style guidelines.

## Documentation, Comments, and Examples

1. Unless obvious to someone new to the project, yet familiar with Clojure/script, a meaningful docstring should be associated with every class, function, behavior, and object.
2. When adding examples use the [ClojureDocs Example Style Guide](https://clojuredocs.org/examples-styleguide) as a reference for creating quality examples.
3. Good articles for quality documentation can be found [here](https://jacobian.org/writing/great-documentation/) and [here](https://bradfults.com/the-best-api-documentation-b9e46400379a).

## Errors

1. Catch blocks should catch on `:default` unless there is a specific exception to be caught.
1. Catch blocks should log errors with `lt.objs.console/error`. Namespaces that the console
  ns depend on cannot refer to the clojure var but can refer to the js fn e.g.
  `(js/lt.objs.console.error err)`.

## Plugins

1. Any `:desc` key should start with the plugin name. For instance, with the Clojure plugin, `:desc "Clojure: Eval editor content"` would be appropriate. This is because the plugin is named Clojure, not because it works with Clojure.

## Behaviors

1. Add brief docstrings via `:desc` key.

## Footnotes

1. This document was inspired by the excellent [Metabase Clojure Style Guide](https://github.com/metabase/metabase/wiki/Metabase-Clojure-Style-Guide).
