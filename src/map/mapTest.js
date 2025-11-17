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
  });
}
