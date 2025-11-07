import SyncMap from "./SyncMap.js";

export default class ObjectMap extends SyncMap {
  constructor(object) {
    super();
    this.object = object;
  }

  delete(key) {
    const exists = key in this.object;
    if (exists) {
      delete this.object[key];
    }
    return exists;
  }

  get(key) {
    const value = this.object[key];
    return typeof value === "object" && !(value instanceof Map)
      ? new this.constructor(value)
      : value;
  }

  *keys() {
    yield* Object.keys(this.object);
  }

  set(key, value) {
    if (value === this.constructor.EMPTY) {
      this.object[key] = new this.constructor({});
    } else {
      this.object[key] = value;
    }
    return this;
  }
}
