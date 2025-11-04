import assert from "node:assert";
import test from "node:test";
import HtmlMapTransform from "./HtmlMapTransform.js";
import object from "./object.js";

const map = new HtmlMapTransform(object);

test("can get the keys of the map", () => {
  assert.deepEqual(Array.from(map.keys()), [
    "Alice.html",
    "Bob.html",
    "Carol.html",
  ]);
});

test("can get the value for a key", () => {
  const alice = map.get("Alice.html");
  assert.equal(alice, "<p>Hello, <strong>Alice</strong>.</p>\n");
});

test("getting a non-existent value returns undefined", () => {
  const david = map.get("David.html");
  assert.equal(david, undefined);
});
