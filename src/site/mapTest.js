import assert from "node:assert";
import { describe, test } from "node:test";

// Given a map instance, run a test suite against it
export default function (map) {
  describe(map.constructor.name, () => {
    test("can get the keys of the map", () => {
      assert.deepEqual(Array.from(map.keys()), [
        "post1.md",
        "post2.md",
        "post3.md",
      ]);
    });

    test("can get the value for a key", () => {
      const post1 = map.get("post1.md");
      assert.equal(post1, "This is **post 1**.");
    });

    test("getting an unsupported key returns undefined", () => {
      assert.equal(map.get("xyz"), undefined);
    });
  });
}
