# TESTING

## Quick Guide
After running ```/script/build.sh``` once,  run ```/script/run-tests.sh```.

##Continuous Testing Architecture Overview 
When a PR is created or updated, the automated test suite will run on travis and appveyor.

During the build processes, dependencies must be downloaded from github. API
rate limits were being hit. To increase the limit, a read-only oauth token for
the account ```light-table-bot``` has been added to the repo.

Light Table is driven by Selenium for testing.

Note a "test" plugin has been added to Light Table, found in `test/lt/lt-test-plugin/`.
The plugin replaces the native "file dialog" so files can be selected and modified.
During testing, the plugin is copied into a temporary home directory for Light Table, forcing
it to load.


## Words Of Caution 
Keep in mind the jvm is slow to boot, and the testing environments used may
be under heavy load. If you need to have a process spawn close to the launching
of Light Table, launch the program in the java tests to minimize delay.

Initially ```light.sh``` was used by test suite to start Light Table. Kill signals
were not propigating correctly and Light Table would not always close. Thus, Light Table
is spawned directly from the test suite.
