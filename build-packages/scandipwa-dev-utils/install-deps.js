const shouldUseYarn = require('@scandipwa/scandipwa-dev-utils/should-use-yarn');
const execCommandAsync = require('@scandipwa/scandipwa-dev-utils/exec-command');

const installDeps = (pathname) => {
    const command = shouldUseYarn() ? 'yarnpkg' : 'npm';

    return execCommandAsync(command, ['install'], pathname);
};

module.exports = installDeps;
