import assert from "node:assert";
import { describe, test } from "node:test";

// Given a map instance, run a test suite against it
export default function (map) {
  describe(map.constructor.name, () => {
    test("get", () => {
      assert.equal(map.get("post1.md"), "This is **post 1**.");
      assert.equal(map.get("xyz"), undefined);
    });

    test("keys", () => {
      const keys = map.keys();
      assert(keys instanceof Iterator);
      assert.deepEqual(Array.from(keys), ["post1.md", "post2.md", "post3.md"]);
    });

    test("entries", () => {
      const entries = Array.from(map.entries());
      const strings = entries.map(([key, value]) => [key, value.toString()]);
      assert.deepEqual(strings, [
        ["post1.md", "This is **post 1**."],
        ["post2.md", "This is **post 2**."],
        ["post3.md", "This is **post 3**."],
      ]);
    });

    test("forEach", () => {
      const calls = [];
      map.forEach((value, key, theMap) => {
        calls.push([key, value.toString(), theMap]);
      });
      assert.deepEqual(calls, [
        ["post1.md", "This is **post 1**.", map],
        ["post2.md", "This is **post 2**.", map],
        ["post3.md", "This is **post 3**.", map],
      ]);
    });

    test("has", () => {
      assert.strictEqual(map.has("post1.md"), true);
      assert.strictEqual(map.has("post2.md"), true);
      assert.strictEqual(map.has("post3.md"), true);
      assert.strictEqual(map.has("xyz"), false);
    });

    test("size", () => {
      assert.strictEqual(map.size, 3);
    });

    test("Symbol.iterator", () => {
      const entries = Array.from(map[Symbol.iterator]());
      const strings = entries.map(([key, value]) => [key, value.toString()]);
      assert.deepEqual(strings, [
        ["post1.md", "This is **post 1**."],
        ["post2.md", "This is **post 2**."],
        ["post3.md", "This is **post 3**."],
      ]);
    });

    test("values", () => {
      const values = Array.from(map.values());
      const strings = values.map((value) => value.toString());
      assert.deepEqual(strings, [
        "This is **post 1**.",
        "This is **post 2**.",
        "This is **post 3**.",
      ]);
    });
  });
}
