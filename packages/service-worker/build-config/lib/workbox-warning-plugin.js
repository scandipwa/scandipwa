const getWarningPlugin = () => ({
    apply: (compiler) => {
        const handleAfterEmit = (compilation, callback) => {
            const index = compilation.warnings.findIndex(
                (warning) => /has been called multiple times/.test(warning)
            );

            if (index !== -1) {
                compilation.warnings.splice(index, 1);
            }

            callback();
        };

        if (process.env.NODE_ENV !== 'development') {
            // run only in development mode
            return;
        }

        compiler.hooks.afterEmit.tapAsync(
            'Remove Workbox Warning',
            handleAfterEmit
        );
    }
});

module.exports = getWarningPlugin;
