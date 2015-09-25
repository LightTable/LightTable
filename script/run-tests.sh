#!/bin/bash

# Installs test dependencies, sets up environment variables,
# calls lein test, and then parses test results to see if
# the tests succeeded.

# Ensure we start in project root
cd "$(dirname "${BASH_SOURCE[0]}")"; cd ..
DIR=$(pwd)

#Redirect LightTable STDOUT to a file to clean up test output
LT_STDOUT_FILE="/tmp/lt-stdout"
touch $LT_STDOUT_FILE
if [[ $(uname -s | grep -i CYGWIN) ]]; then
    LT_STDOUT_FILE="$(cygpath -aw $LT_STDOUT_FILE)"
fi

echo "Killing all chromedrivers. New instance will be created by test suite."
killall "chromedriver" &> /dev/null
killall "chromedriver.exe" &> /dev/null

#Fetch chrome driver
cd ./deploy/electron/
node_modules/.bin/grunt download-electron-chromedriver
cd - 

echo "Running tests"
LT_STDOUT_FILE="$LT_STDOUT_FILE" lein with-profile dev test | tee /tmp/testoutput

#Check test results
#lein.bat return code is 0 even if tests fails on windows
#we grep the lein test output to to make sure no tests fail or errors
#this gives us cross os compatibility
tail -n 4 /tmp/testoutput | grep "^0 failures, 0 errors" > /dev/null
RETURN_CODE=$?

echo "===LIGHT TABLE DEBUG==="
cat $LT_STDOUT_FILE

exit $RETURN_CODE
