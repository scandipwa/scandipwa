const afterEmitLogger = require('../src');

class WebpackAfterEmitLogger {
    pluginMeta = { name: 'WebpackAfterEmitLogger' };

    apply(compiler) {
        // TODO check if it works
        compiler.hooks.afterEmit.tap(
            this.pluginMeta,
            () => afterEmitLogger.emitLogs()
        );
    }
}

module.exports = WebpackAfterEmitLogger;
