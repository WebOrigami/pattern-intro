import * as fs from "node:fs";
import path from "node:path";

export default class FileMap extends Map {
  constructor(dirname) {
    super();
    this.dirname = path.resolve(process.cwd(), dirname);
  }

  get(key) {
    const filename = path.resolve(this.dirname, key);
    try {
      return fs.readFileSync(filename);
    } catch (error) {
      if (error.code === "ENOENT") {
        return undefined; // File not found
      }
      throw error;
    }
  }

  *keys() {
    try {
      yield* fs.readdirSync(this.dirname);
    } catch (/** @type {any} */ error) {
      if (error.code === "ENOENT") {
        // Directory doesn't exist yet; treat as empty
      } else {
        throw error;
      }
    }
  }
}
