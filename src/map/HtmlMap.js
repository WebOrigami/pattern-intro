import { marked } from "marked";
import SyncMap from "./SyncMap.js";

export default class HtmlMap extends SyncMap {
  constructor(markdownMap) {
    super();
    this.source = markdownMap;
  }

  get(key) {
    if (!key.endsWith(".html")) {
      return undefined;
    }
    const markdownKey = key.replace(/\.html$/, ".md");
    const markdown = this.source.get(markdownKey);
    return markdown ? marked(markdown.toString()) : undefined;
  }

  *keys() {
    for (const markdownKey of this.source.keys()) {
      yield markdownKey.replace(/\.md$/, ".html");
    }
  }
}
