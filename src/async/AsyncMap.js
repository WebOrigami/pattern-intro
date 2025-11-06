export default class AsyncMap {
  [Symbol.asyncIterator]() {
    return this.entries();
  }

  /**
   * Remove all entries from the map.
   *
   * This requires that the subclass implement delete().
   */
  async clear() {
    for await (const key of this.keys()) {
      await this.delete(key);
    }
  }

  /**
   * Deletes the given key from the map.
   *
   * Returns true if the key was present and deleted, false if not.
   */
  async delete(key) {
    throw new Error("delete() not implemented");
  }

  static EMPTY = Symbol("EMPTY");

  /**
   * Returns an async iterable of the map's key-value pairs.
   */
  async *entries() {
    const keys = [];
    const valuePromises = [];
    // Invoke get() calls without waiting; some may take longer than others
    for await (const key of this.keys()) {
      keys.push(key);
      valuePromises.push(this.get(key));
    }
    // Now wait for all promises to resolve
    const values = await Promise.all(valuePromises);
    for (let i = 0; i < keys.length; i++) {
      yield [keys[i], values[i]];
    }
  }

  /**
   * Invokes a callback for each key-value pair in the map.
   */
  async forEach(callback, thisArg = this) {
    for await (const [key, value] of this.entries()) {
      await callback(value, key, thisArg);
    }
  }

  /**
   * Returns the value for the given key.
   */
  async get(key) {
    throw new Error("get() not implemented");
  }

  /**
   * Groups items from an async iterable into an AsyncMap according to
   * the keys returned by the given function.
   */
  static async groupBy(iterable, keyFn) {
    const map = new Map();
    let index = 0;
    for await (const element of iterable) {
      const key = await keyFn(element, index);
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key).push(element);
      index++;
    }
    return map;
  }

  /**
   * Returns true if the given key appears in the set returned by keys().
   *
   * It doesn't matter whether the value returned by get() is defined or not.
   */
  async has(key) {
    for await (const k of this.keys()) {
      if (k === key) {
        return true;
      }
    }
    return false;
  }

  /**
   * Returns an async iterable of the map's keys.
   */
  async *keys() {
    throw new Error("keys() not implemented");
  }

  /**
   * Sets the value for the given key.
   */
  async set(key, value) {
    throw new Error("set() not implemented");
  }

  /**
   * The number of keys in the map.
   */
  get size() {
    return (async () => {
      let count = 0;
      for await (const _ of this.keys()) {
        count++;
      }
      return count;
    })();
  }

  /**
   * Returns an async iterable of the map's values.
   */
  async *values() {
    const valuePromises = [];
    // Invoke get() calls without waiting; some may take longer than others
    for await (const key of this.keys()) {
      valuePromises.push(this.get(key));
    }
    // Now wait for all promises to resolve
    const values = await Promise.all(valuePromises);
    yield* values;
  }
}
