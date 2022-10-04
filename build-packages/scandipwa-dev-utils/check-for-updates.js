const semver = require('semver');
const fs = require('fs');
const path = require('path');
const logger = require('@scandipwa/scandipwa-dev-utils/logger');
const writeJson = require('@scandipwa/scandipwa-dev-utils/write-json');

const getLatestVersion = require('./latest-version');

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const COOLDOWN_FILE_PATH = path.resolve(__dirname, './cooldown.json');

const ensureStorage = () => {
    // Ensure cooldown storage
    const storageExists = fs.existsSync(COOLDOWN_FILE_PATH);

    if (!storageExists) {
        writeJson(COOLDOWN_FILE_PATH, {});
    }
};

const isCooldown = (name) => {
    // Read
    const cooldownStorage = require(COOLDOWN_FILE_PATH);

    // Check if first check
    const { checkedAt, TTL } = cooldownStorage[name] || {};

    if (!checkedAt) {
        return false;
    }

    // Check if TTL expired
    const now = Date.now();

    if (now - checkedAt > TTL) {
        return false;
    }

    // TTL did not expire
    return true;
};

const setCooldown = (name, TTL) => {
    // Read
    const cooldownStorage = require(COOLDOWN_FILE_PATH);

    // Update
    cooldownStorage[name] = {
        checkedAt: Date.now(),
        TTL,
    };

    // Save
    writeJson(COOLDOWN_FILE_PATH, cooldownStorage);
};

const checkForUpdates = async (name, currentVersion, TTL = ONE_DAY_IN_MS) => {
    ensureStorage();

    if (isCooldown(name)) {
        return;
    }

    try {
        const latestVersion = await getLatestVersion(name);

        if (semver.gt(latestVersion, currentVersion)) {
            logger.warn(
                `Global module ${ logger.style.misc(name) } is outdated.`,
                `Please upgrade it to latest version ${ logger.style.misc(latestVersion) }.`,
                `You can do it by running following command: ${ logger.style.command(`npm install -g ${ name }@latest`) }.`
            );
        }
    } catch (e) {
        logger.warn(`Package ${ logger.style.misc(name) } is not yet published.`);
        logger.log(); // add empty line
    }

    setCooldown(name, TTL);
};

module.exports = checkForUpdates;
