import assert from "node:assert";
import test from "node:test";
import tree from "./object.js";

test("can get the keys of the map", () => {
  assert.deepEqual(Array.from(tree.keys()), ["Alice.md", "Bob.md", "Carol.md"]);
});

test("can get the value for a key", () => {
  const alice = tree.get("Alice.md");
  assert.equal(alice, "Hello, **Alice**.");
});

test("getting an unsupported key returns undefined", () => {
  assert.equal(tree.get("xyz"), undefined);
});
