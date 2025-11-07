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
    try {
      fs.rmSync(destPath, { recursive: true });
      return true;
    } catch (/** @type {any} */ error) {
      if (error.code === "ENOENT") {
        return false; // File or directory didn't exist
      }
      throw error;
    }
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
    const destPath = path.resolve(this.dirname, key);
    if (value === this.constructor.EMPTY) {
      // Create empty subdirectory
      fs.mkdirSync(destPath, { recursive: true });
    } else {
      // Ensure this directory exists before writing out the file
      fs.mkdirSync(this.dirname, { recursive: true });
      // Write file
      fs.writeFileSync(destPath, value);
    }
    return this;
  }
}
