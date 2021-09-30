const path = require('path');

const processArgs = (args) => {
    const possibleDir = args[0];

    // if there are no args
    // if the dir is not argument
    if (!possibleDir || possibleDir.startsWith('--')) {
        return {
            args,
            dir: process.cwd()
        };
    }

    return {
        args: args.slice(1),
        dir: path.join(process.cwd(), possibleDir)
    };
};

module.exports = processArgs;
