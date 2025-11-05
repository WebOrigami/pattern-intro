import SyncMap from "./SyncMap.js";

export default class FunctionMap extends SyncMap {
  constructor(fn, domain) {
    super();
    this.fn = fn;
    this.domain = domain;
  }

  get(key) {
    return this.fn(key);
  }

  *keys() {
    yield* this.domain;
  }
}
