const obj = {
  "Alice.md": "Hello, **Alice**.",
  "Bob.md": "Hello, **Bob**.",
  "Carol.md": "Hello, **Carol**.",
};

export default {
  get(key) {
    return obj[key];
  },

  *keys() {
    yield* Object.keys(obj);
  },
};
