import SyncMap from "./SyncMap.js";

export default class ObjectMap extends SyncMap {
  constructor(object) {
    super();
    this.object = object;
  }

  get(key) {
    return this.object[key];
  }

  *keys() {
    yield* Object.keys(this.object);
  }
}
