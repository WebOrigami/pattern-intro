/**
 * A base class for creating custom Map subclasses
 */
export default class SyncMap extends Map {
  // Override clear() to call overridden keys() and delete()
  clear() {
    for (const key of this.keys()) {
      this.delete(key);
    }
  }

  // Assume map is read-only unless delete() is overridden
  delete(key) {
    throw new Error("SyncMap: map is read-only");
  }

  // Used to create empty submaps
  static EMPTY = Symbol("EMPTY");

  // Override entries() method to call overridden get() and keys()
  *entries() {
    for (const key of this.keys()) {
      const value = this.get(key);
      yield [key, value];
    }
  }

  // Override forEach() to call entries()
  forEach(callback, thisArg = this) {
    for (const [key, value] of this.entries()) {
      callback(value, key, thisArg);
    }
  }

  // Define the size to be the number of keys
  get size() {
    let count = 0;
    for (const key of this.keys()) {
      count++;
    }
    return count;
  }

  // Make the default iterator be entries()
  [Symbol.iterator]() {
    return this.entries();
  }

  // Assume map is read-only unless set() is overridden
  set(key, value) {
    throw new Error("SyncMap: map is read-only");
  }

  // Override values() to call overridden get() and keys()
  *values() {
    for (const key of this.keys()) {
      const value = this.get(key);
      yield value;
    }
  }
}
