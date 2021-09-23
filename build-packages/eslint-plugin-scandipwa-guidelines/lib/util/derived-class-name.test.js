const assert = require("assert");

const { getExpectedClassNameFromFilename, shouldClassNameBeEnforced } = require('./derived-class-name.js');

describe("shouldClassNameBeEnforced", () => {
    it("should return true when given the name of a component file", () => {
        assert(shouldClassNameBeEnforced("Footer.component.js"))
    });

    it("should return true when given the name of a container file", () => {
        assert(shouldClassNameBeEnforced("Header.container.js"))
    });

    it("should return false when given a file without a postfix", () => {
        assert(!shouldClassNameBeEnforced("test.js"))
    })
});

describe("getExpectedClassNameFromFilename", () => {
    it("should correctly return the expected component class name", () => {
        assert.strictEqual(
            getExpectedClassNameFromFilename("Header.component.js"),
            "HeaderComponent",
        )
    });

    it("should correctly return the expected dispatcher class name", () => {
        assert.strictEqual(
            getExpectedClassNameFromFilename("Breadcrumbs.dispatcher.js"),
            "BreadcrumbsDispatcher",
        )
    });

    it("should correctly return the expected query class name", () => {
        assert.strictEqual(
            getExpectedClassNameFromFilename("Category.query.js"),
            "CategoryQuery",
        )
    });

    it("should work when the filename indicates no component type", () => {
        assert.strictEqual(
            getExpectedClassNameFromFilename("test.js"),
            "Test",
        )
    })
});
