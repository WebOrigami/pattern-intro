import { marked } from "marked";
import SyncMap from "./SyncMap.js";

export default class HtmlMap extends SyncMap {
  constructor(markdownMap) {
    super();
    this.source = markdownMap;
  }

  get(key) {
    const sourceKey = key.replace(/\.html$/, ".md");
    const sourceValue = this.source.get(sourceKey);
    const resultValue =
      sourceValue && key.endsWith(".html")
        ? marked(sourceValue.toString())
        : sourceValue instanceof Map
        ? new this.constructor(sourceValue)
        : undefined;
    return resultValue;
  }

  *keys() {
    for (const sourceKey of this.source.keys()) {
      const resultKey = sourceKey.replace(/\.md$/, ".html");
      yield resultKey;
    }
  }
}
