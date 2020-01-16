#!/usr/bin/env node

var parseArguments = require("./parse-arguments"),
    replace = require("../replace");

var options = parseArguments("search");

replace(options);
