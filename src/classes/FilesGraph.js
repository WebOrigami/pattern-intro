import * as fs from "node:fs/promises";
import path from "node:path";

export default class FilesGraph {
  constructor(dirname) {
    this.dirname = path.resolve(process.cwd(), dirname);
  }

  async *[Symbol.asyncIterator]() {
    const filenames = await fs.readdir(this.dirname);
    yield* filenames;
  }

  async get(key) {
    const objPath = path.resolve(this.dirname, key);
    try {
      return await fs.readFile(objPath); // Return file contents
    } catch (/** @type {any} */ error) {
      if (error.code === "ENOENT" /* File not found */) {
        return undefined;
      }
      throw error;
    }
  }
}
