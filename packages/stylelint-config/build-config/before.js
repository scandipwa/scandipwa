const path = require('path');
const fs = require('fs-extra');

const CONFIG_TO_MERGE = {
    'stylelint.validate': [
        'css',
        'scss'
    ],
    'editor.codeActionsOnSave': {
        'source.fixAll.eslint': true,
        'source.fixAll.stylelint': true
    },
    'stylelint.enable': true,
    'css.validate': false,
    'scss.validate': false
};

const readJsonConfig = (pathToConfig) => {
    try {
        const rawConfigData = fs.readFileSync(pathToConfig);
        return JSON.parse(rawConfigData.toString());
    } catch (e) {
        return {};
    }
};

module.exports = () => {
    const projectRoot = process.cwd();
    const pathToConfig = path.join(projectRoot, '.vscode', 'settings.json');

    fs.ensureFileSync(pathToConfig);

    const newConfig = {
        ...readJsonConfig(pathToConfig),
        ...CONFIG_TO_MERGE
    };

    fs.writeFileSync(
        pathToConfig,
        JSON.stringify(newConfig, null, 4)
    );

    const stylelintConfigPath = path.join(projectRoot, '.stylelintrc');
    const isExists = fs.existsSync(stylelintConfigPath);

    if (isExists) {
        return;
    }

    fs.copyFileSync(
        path.join(__dirname, 'stylelintrc.json'),
        stylelintConfigPath
    );
};
