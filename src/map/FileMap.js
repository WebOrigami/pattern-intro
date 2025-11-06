import * as fs from "node:fs";
import path from "node:path";
import SyncMap from "./SyncMap.js";

export default class FileMap extends SyncMap {
  constructor(dirname) {
    super();
    this.dirname = path.resolve(process.cwd(), dirname);
  }

  delete(key) {
    const destPath = path.resolve(this.dirname, key);
    fs.rmSync(destPath, { force: true, recursive: true });
    return true;
  }

  get(key) {
    const filePath = path.resolve(this.dirname, key);
    let stats;
    try {
      stats = fs.statSync(filePath);
    } catch (/** @type {any} */ error) {
      if (error.code === "ENOENT" /* File not found */) {
        return undefined;
      }
      throw error;
    }

    return stats.isDirectory()
      ? new this.constructor(filePath) // Return subdirectory as a tree
      : fs.readFileSync(filePath); // Return file contents
  }

  *keys() {
    try {
      yield* fs.readdirSync(this.dirname);
    } catch (/** @type {any} */ error) {
      if (error.code === "ENOENT") {
        // Directory doesn't exist yet; will treat as empty
      } else {
        throw error;
      }
    }
  }

  set(key, value) {
    // Ensure this directory exists before writing out the file
    fs.mkdirSync(this.dirname, { recursive: true });
    const destPath = path.resolve(this.dirname, key ?? "");
    if (value === FileMap.EMPTY) {
      // Create empty subdirectory
      fs.mkdirSync(destPath, { recursive: true });
    } else {
      // Write file
      fs.writeFileSync(destPath, value);
    }
    return this;
  }
}
