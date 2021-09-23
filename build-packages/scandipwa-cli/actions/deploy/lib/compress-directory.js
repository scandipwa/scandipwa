const archiver = require('archiver');
const fs = require('fs');
const os = require('os');
const path = require('path');
const logger = require('@scandipwa/scandipwa-dev-utils/logger');

const compressDirectory = (contextPathname, directory) => {
    const archiveName = `build-${Date.now()}.zip`;
    const destination = path.join(os.tmpdir(), archiveName);
    const target = path.join(contextPathname, directory);

    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(destination);
        const archive = archiver('zip', {
            zlib: { level: 9 }
        });

        output.on('close', () => {
            logger.log('Build files compressed successfully.');
            resolve(destination);
        });

        archive.on('error', (err) => {
            reject(err);
        });

        archive.pipe(output);
        archive.directory(target, false);
        archive.finalize();
    });
};

module.exports = compressDirectory;
