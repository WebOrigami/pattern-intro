import FunctionMap from "./FunctionMap.js";

export default new FunctionMap(
  (key) => {
    if (key.endsWith(".md")) {
      const name = key.slice(0, -3);
      return `Hello, **${name}**.`;
    }
  },
  ["Alice.md", "Bob.md", "Carol.md"]
);
