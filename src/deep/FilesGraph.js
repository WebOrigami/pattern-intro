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
    const filePath = path.resolve(this.dirname, key);

    let stats;
    try {
      stats = await fs.stat(filePath);
    } catch (/** @type {any} */ error) {
      if (error.code === "ENOENT" /* File not found */) {
        return undefined;
      }
      throw error;
    }

    return stats.isDirectory()
      ? new FilesGraph(filePath) // Return subdirectory as a graph
      : fs.readFile(filePath); // Return file contents
  }
}