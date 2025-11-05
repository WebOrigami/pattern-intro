import assert from "node:assert";
import { describe, test } from "node:test";

// Given a map instance, run a test suite against it
export default function (map) {
  describe(map.constructor.name, () => {
    test("can get the keys of the map", () => {
      assert.deepEqual(Array.from(map.keys()), [
        "Alice.md",
        "Bob.md",
        "Carol.md",
      ]);
    });

    test("can get the value for a key", () => {
      const alice = map.get("Alice.md");
      assert.equal(alice, "Hello, **Alice**.");
    });

    test("getting an unsupported key returns undefined", () => {
      assert.equal(map.get("xyz"), undefined);
    });
  });
}
