const assert = require("assert");
const { constructMessage } = require("./messages.js");

describe("constructMessage", () => {
    it("should return a correctly formatted message", () => {
        assert.strictEqual(
            constructMessage("message", "relax", "example.com"),
            "message\nHelp: relax\nFor more information, see: example.com",
        );
    });
});
