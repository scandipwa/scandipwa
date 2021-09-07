#!/usr/bin/env node

const generatePages = require('@scandipwa/next-emulator/lib/generatePages');

generatePages().then(() => {
    require('@tilework/mosaic-cra-scripts/bin/cra-scripts');
});
