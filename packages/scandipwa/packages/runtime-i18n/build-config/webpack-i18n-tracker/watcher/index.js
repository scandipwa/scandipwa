const chokidar = require('chokidar');

/**
 * Create a samurai watcher for declared pathname
 * Watch for all the events specified
 * On event emit - callback => harakiri!
 * @param {string} pathname
 * @param {string[]} events
 * @param {function} callback
 */
module.exports = (pathname, events, callback) => {
    const watcher = chokidar.watch(pathname, {
        interval: 500
    });

    harakiri = () => watcher.close()

    events.forEach(event => {
        watcher.on(event, (...args) => {
            callback(...args);
            harakiri();
        })
    });
}
