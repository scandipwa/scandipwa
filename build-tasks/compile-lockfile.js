#!/usr/bin/env node

const { execFileSync } = require('child_process');
const fse = require('fs-extra');
const os = require('os');
const path = require('path');

const temp = path.join(os.tmpdir(), 'csa-compile-lockfile');

try {
    // Ensures that we start from a clean state
    fse.removeSync(temp);
    fse.mkdirSync(temp);

    // Create an empty package.json that we'll populate
    fse.writeFileSync(path.join(temp, 'package.json'), '{}');

    // Extract the dependencies from react-scripts and scandipwa (which are workspaces)
    const themeDeps = require('@scandipwa/scandipwa/package.json').dependencies;
    const scriptsDeps = require('@scandipwa/scandipwa-scripts/package.json').dependencies;

    const descriptors = [
        ...Object.keys(themeDeps).map((dep) => `${dep}@${themeDeps[dep]}`),
        ...Object.keys(scriptsDeps).map((dep) => `${dep}@${scriptsDeps[dep]}`)
    ];

    // Run "yarn add" with all the dependencies of react-scripts
    execFileSync(
        'yarn',
        [
            'add',
            ...descriptors
        ],
        { cwd: temp }
    );

    // Store the generated lockfile in create-react-app
    // We can't store it inside react-scripts, because we need it even before react-scripts is installed
    fse.copySync(
        path.join(
            temp,
            'yarn.lock'
        ),
        path.join(
            __dirname,
            '..',
            'build-packages',
            'csa-generator-theme',
            'template',
            'yarn.lock.cached'
        )
    );
} finally {
    fse.removeSync(temp);
}
