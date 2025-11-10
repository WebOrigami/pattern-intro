export default class ObjectMap extends Map {
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
