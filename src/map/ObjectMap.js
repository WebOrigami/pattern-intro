import SyncMap from "./SyncMap.js";

export default class ObjectMap extends SyncMap {
  constructor(object) {
    super();
    this.object = object;
  }

  get(key) {
    const value = this.object[key];
    return value instanceof Map || typeof value !== "object"
      ? value
      : new this.constructor(value);
  }

  *keys() {
    yield* Object.keys(this.object);
  }
}
