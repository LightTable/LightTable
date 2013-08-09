#!/usr/bin/env node

var nomnom = require("nomnom"),
    replace = require("../replace"),
    sharedOptions = require("./shared-options");

var options = nomnom.options(sharedOptions)
  .script("search")
  .parse();

replace(options);
