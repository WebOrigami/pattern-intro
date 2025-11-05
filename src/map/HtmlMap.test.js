import assert from "node:assert";
import { describe, test } from "node:test";
import HtmlMap from "./HtmlMap.js";
import markdownMap from "./object.js";

const htmlMap = new HtmlMap(markdownMap);

describe("HtmlMap", () => {
  test("can get the keys of the map", () => {
    assert.deepEqual(Array.from(htmlMap.keys()), [
      "post1.html",
      "post2.html",
      "post3.html",
    ]);
  });

  test("can get the value for a key", () => {
    const post1 = htmlMap.get("post1.html");
    assert.equal(post1, "<p>This is <strong>post 1</strong>.</p>\n");
  });

  test("getting a non-existent value returns undefined", () => {
    const post4 = htmlMap.get("post4.html");
    assert.equal(post4, undefined);
  });
});
