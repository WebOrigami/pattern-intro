export default class FunctionMap extends Map {
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
