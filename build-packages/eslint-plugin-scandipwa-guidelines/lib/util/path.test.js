const assert = require("assert");
const { getNamePartsFromFilename, getFilenameFromPath } = require("./path.js");

describe("getNamePartsFromFilename", () => {
    it("should correctly split the filename", () => {
        assert.deepStrictEqual(getNamePartsFromFilename("Header.component.js"), ["Header", "component"]);
    })
});

describe("getFilenameFromPath", () => {
    it("should return the filename", () => {
        assert.strictEqual(getFilenameFromPath("some/path/Header.component.js"), "Header.component.js");
        assert.strictEqual(getFilenameFromPath("/absolute/path/Footer.component.js"), "Footer.component.js");
    })
});

