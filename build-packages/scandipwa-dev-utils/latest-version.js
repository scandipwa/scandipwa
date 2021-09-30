const https = require('https');
const spawn = require('cross-spawn');

const getLatestVersionFromRegistry = (packageName) => new Promise((resolve, reject) => {
    https
        .get(
            `https://registry.npmjs.org/-/package/${packageName}/dist-tags`,
            (res) => {
                if (res.statusCode === 200) {
                    let body = '';
                    res.on('data', (data) => {
                        body += data;
                    });
                    res.on('end', () => {
                        resolve(JSON.parse(body).latest);
                    });
                } else {
                    reject();
                }
            }
        )
        .on('error', () => {
            reject();
        });
});

const getLatestVersion = async (packageName) => {
    try {
        return getLatestVersionFromRegistry(packageName);
    } catch (e) {
        // we expect this to throw, so promise gets rejected
        return spawn.sync('npm view create-magento-app version').toString().trim();
    }
};

module.exports = getLatestVersion;
