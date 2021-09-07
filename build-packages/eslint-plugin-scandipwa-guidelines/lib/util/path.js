function getFilenameFromPath(path) {
    const exploded = path.split("/");
    return exploded[exploded.length - 1];
}

function getNamePartsFromFilename(filename) {
    const namePartsWithExtension = filename.split(".");
    return namePartsWithExtension.slice(0, -1);
}

module.exports = {
    getFilenameFromPath,
    getNamePartsFromFilename,
};
