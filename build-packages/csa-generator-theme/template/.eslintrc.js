module.exports = {
    extends: [
        '@scandipwa',
    ],
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
        requireConfigFile: false,
        babelOptions: {
            presets: ['@babel/preset-react'],
        },
    },
    rules: {
        '@typescript-eslint/object-curly-spacing': 'off',
        // TODO: disable or enable rules here
    },
};
