/* eslint-disable */

const fs = require('fs');
const path = require('path');

const copyDir = (src, dest) => {
    fs.mkdirSync(dest, { recursive: true });

    const files = fs.readdirSync(src);
    files.forEach((file) => {
        const current = fs.lstatSync(path.join(src, file));
        if (current.isDirectory()) {
			copyDir(
                path.join(src, file),
                path.join(dest, file)
            );
		} else {
			fs.copyFileSync(
                path.join(src, file),
                path.join(dest, file)
            );
		}
    });
};

const copyFile = (src, dest) => {
    const parentdir = path.join(dest, '..');
    if (!fs.existsSync(parentdir)) {
        fs.mkdirSync(parentdir, { recursive: true });
    }

    fs.copyFileSync(src, dest);
}

const DEFAULT_PROJECT_ROOT = 'app/design/frontend/Scandiweb/pwa';
const DEFAULT_FALLBACK_ROOT = 'vendor/scandipwa/source';

const PROJECTROOT = process.env.PROJECTROOT || DEFAULT_PROJECT_ROOT;
const FALLBACKROOT = process.env.FALLBACKROOT || DEFAULT_FALLBACK_ROOT;

const bootstrap = () => {
    const createProjectRoot = () => {
        fs.mkdirSync(PROJECTROOT, { recursive: true });
    };

    const copyQueue = [
        'package.json',
        'package-lock.json',
        'src/config/',
        'src/public/',
        'i18n/',
        {
            source: '.eslintrc',
            destination: '.eslintrc.sample',
        },
        'process.yml',
        'jsconfig.json',
        'etc/view.xml',
        'media/',
        // v3
        '.npmrc',
        'scandipwa.json',
    ];

    const irregularCopyQueue = [];

    /**
     * @param {Array} queue
     */
    const copyFiles = () => {
        const isDirectory = (path_string) => fs.lstatSync(path_string).isDirectory();

        copyQueue.forEach((entry) => {
            if (typeof entry === 'string') {
                var sourceFileName = entry,
                    destFileName = entry;
            } else {
                var sourceFileName = entry.source,
                    destFileName = entry.destination;
            }

            const sourcePath = path.join(FALLBACKROOT, sourceFileName);
            const destPath = path.join(PROJECTROOT, destFileName);

            if (!fs.existsSync(sourcePath)) {
                console.log(`File ${sourcePath} does not exist, proceeding`);
                return;
            }

            if (isDirectory(sourcePath)) {
                copyDir(sourcePath, destPath);
            } else {
                copyFile(sourcePath, destPath);
            }
        });
    };

    createProjectRoot();
    copyFiles();
};

bootstrap();
