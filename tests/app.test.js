const test = require("node:test");
const assert = require("node:assert");

test("Application configuration should use the correct default port", () => {
    const defaultPort = process.env.PORT || 3005;

    assert.strictEqual(defaultPort, 3005);
});

test("Application environment should have a valid value", () => {
    const environment = process.env.NODE_ENV || "development";

    assert.ok(
        ["development", "test", "production"].includes(environment)
    );
});