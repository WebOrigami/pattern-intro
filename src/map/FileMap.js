import * as fs from "node:fs";
import path from "node:path";

export default class FileMap extends Map {
  constructor(dirname) {
    super();
    this.dirname = path.resolve(process.cwd(), dirname);
  }

  get(key) {
    const fileName = path.resolve(this.dirname, key);
    try {
      return fs.readFileSync(fileName); // Return file contents
    } catch (/** @type {any} */ error) {
      if (error.code === "ENOENT" /* File not found */) {
        return undefined;
      }
      throw error;
    }
  }

  *keys() {
    yield* fs.readdirSync(this.dirname);
  }
}
