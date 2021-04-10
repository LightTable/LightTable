var sharedOptions = require("./shared-options");

module.exports = function(scriptName, addlPosArgs, addlOpts) {
    addlPosArgs = addlPosArgs || [];
    addlOpts = addlOpts || {};

    var posArgs = {};
    var opts = {};
    Object.keys(sharedOptions).forEach(function(name) {
        var option = sharedOptions[name];
        if (typeof option.position === 'number') {
            posArgs[name] = option;
        } else {
            opts[name] = option;
        }
    });

    var options = Object.assign({}, opts, addlOpts);

    var positionalArgs = [];
    [posArgs, addlPosArgs].forEach(function(posArgs) {
        Object.keys(posArgs).forEach(function(name) {
            var posArg = posArgs[name];
            posArg.name = name;
            positionalArgs[posArg.position] = posArg;
        });
    });

    var command = "$0";
    positionalArgs.forEach(function(positionalArg) {
        var option = positionalArg.name;

        if (positionalArg.array) {
            option += "..";
        }
        if (positionalArg.demandOption) {
            option = "<" + option + ">";
        } else {
            option = "[" + option + "]";
        }

        command += " " + option;
    });


    return require("yargs")
        .scriptName(scriptName)
        .command(command, "", function(yargs) {
            positionalArgs.forEach(function(positionalArg) {
                yargs.positional(positionalArg.name, positionalArg);
            });
        })
        .options(options)
        .argv;
};
