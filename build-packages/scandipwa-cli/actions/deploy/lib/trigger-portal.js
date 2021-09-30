const fetch = require('node-fetch');

const portalUrl = process.env.PORTAL_URL || 'https://newrmportal.indvp.swk8s.com/api/static-content/';

const triggerPortal = async (path, body) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${portalUrl}${path}`, options);
};

module.exports = triggerPortal;
