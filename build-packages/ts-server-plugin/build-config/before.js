const path = require('path');
const fs = require('fs-extra');
const getPackagePath = require('@scandipwa/scandipwa-dev-utils/package-path');
const createJsConfig = require('@tilework/mosaic-config-injectors/lib/babel/ensure-config');

const INLINE_HINTS_CONFIG = {
    'javascript.inlayHints.propertyDeclarationTypes.enabled': true,
    'javascript.inlayHints.functionLikeReturnTypes.enabled': true,
    'typescript.inlayHints.propertyDeclarationTypes.enabled': true,
    'typescript.inlayHints.functionLikeReturnTypes.enabled': true
};

const readJsonConfig = (pathToConfig) => {
    try {
        const rawConfigData = fs.readFileSync(pathToConfig);
        return JSON.parse(rawConfigData.toString());
    } catch (e) {
        return {};
    }
};

const getTsSdkPath = () => {
    try {
        const pathToTs = getPackagePath('typescript', process.cwd());
        return path.relative(
            process.cwd(),
            path.join(pathToTs, 'lib')
        );
    } catch (e) {
        return './node_modules/typescript/lib';
    }
};

const addPluginToConfig = () => {
    const jsConfigPath = path.join(process.cwd(), 'jsconfig.json');
    const tsConfigPath = path.join(process.cwd(), 'tsconfig.json');

    const existingConfigPath = [jsConfigPath, tsConfigPath].find(
        (configPath) => fs.existsSync(configPath)
    );

    if (!existingConfigPath) {
        return;
    }

    const existingConfig = readJsonConfig(existingConfigPath[0]);

    if (!existingConfig.compilerOptions) {
        // vvv Ensue compiler options
        existingConfig.compilerOptions = {};
    }

    if (!existingConfig.compilerOptions.plugins) {
        // vvv Ensue compiler plugins
        existingConfig.compilerOptions.plugins = [];
    }

    existingConfig.compilerOptions.plugins.push({
        name: '@scandipwa/ts-server-plugin'
    });

    fs.writeFileSync(
        existingConfigPath,
        JSON.stringify(existingConfig, null, 4)
    );
};

module.exports = () => {
    const projectRoot = process.cwd();
    const pathToConfig = path.join(projectRoot, '.vscode', 'settings.json');

    fs.ensureFileSync(pathToConfig);

    const newConfig = {
        ...readJsonConfig(pathToConfig),
        // vvv Enables custom TS server
        'typescript.tsdk': getTsSdkPath(),
        'typescript.enablePromptUseWorkspaceTsdk': true,
        // vvv Required for inlineHints to work
        ...INLINE_HINTS_CONFIG
    };

    fs.writeFileSync(
        pathToConfig,
        JSON.stringify(newConfig, null, 4)
    );

    createJsConfig();

    // vvv Add plugin to js/ts config
    addPluginToConfig();
};
