Mocks LightTable components so application can be tested.

To compile and update plugin:

1. Create symbolic link in LightTable plugin directory to plugin source

    ~~~
    ln -s ~/programming/LightTable/test/lt/lt-test-plugin ~/Library/Application\ Support/LightTable/plugins/lighttable-test-plugin
    ~~~
1. Open plugin sourcecode in light table , `src/lt/plugins/lighttable-test-plugin.cljs`.
1. Save cljs file. Light table should auto compile.
1. Remove symbolic link created in step one.
1. Run `lein test` to ensure tests still work.
