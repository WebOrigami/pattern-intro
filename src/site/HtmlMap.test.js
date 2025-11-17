import assert from "node:assert";
import { describe, test } from "node:test";
import HtmlMap from "./HtmlMap.js";
import markdownMap from "./object.js";

const htmlMap = new HtmlMap(markdownMap);

describe("HtmlMap", () => {
  test("get", () => {
    assert.equal(
      htmlMap.get("post1.html"),
      "<p>This is <strong>post 1</strong>.</p>\n"
    );
    assert.equal(htmlMap.get("xyz"), undefined);
  });

  test("keys", () => {
    assert.deepEqual(Array.from(htmlMap.keys()), [
      "post1.html",
      "post2.html",
      "post3.html",
    ]);
  });
});
