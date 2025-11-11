import AsyncMap from "./AsyncMap.js";

const textMediaTypes = [
  "application/json",
  "application/xml",
  "text/css",
  "text/html",
  "text/markdown",
  "text/plain",
];

/**
 * An asynchronous map representation of a site area that implements the [JSON
 * Keys](https://weborigami.org/async-tree/jsonkeys.html) protocol.
 */
export default class ExplorableSiteMap extends AsyncMap {
  constructor(href) {
    super();
    this.href = href;
  }

  async get(key) {
    // Extend the URL with the key and fetch the resource
    const href = new URL(key, this.href).href;
    const response = await fetch(href);
    if (!response.ok) {
      return undefined;
    }
    // If a known text type, return the text; otherwise return an ArrayBuffer
    const mediaType = response.headers?.get("Content-Type")?.split(";")[0];
    const value = textMediaTypes.includes(mediaType)
      ? await response.text()
      : await response.arrayBuffer();
    return value;
  }

  async *keys() {
    // Save a promise to ensure we only check for keys once, even if multiple
    // requests are made before the first one completes.
    this.keysPromise ??= this.get(".keys.json").then((json) =>
      json ? JSON.parse(json) : []
    );
    const keys = await this.keysPromise;
    yield* keys;
  }
}
