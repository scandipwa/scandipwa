const fetch = require('node-fetch');
const fs = require('fs');

const logger = require('@scandipwa/scandipwa-dev-utils/logger');

const uploadFile = async (filename, uploadUrl) => {
    const stats = fs.statSync(filename);
    const fileSizeInBytes = stats.size;

    const bufferContent = fs.readFileSync(filename);

    const { status, statusText } = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
            'Content-length': fileSizeInBytes
        },
        body: bufferContent
    });

    logger.log(`Code upload result: ${logger.style.misc(statusText)}. Code: ${logger.style.misc(status)}`);
};

module.exports = uploadFile;
