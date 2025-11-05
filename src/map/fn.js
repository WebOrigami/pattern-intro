import FunctionMap from "./FunctionMap.js";

export default new FunctionMap(
  (key) => {
    const match = /.+(?<number>\d+)\.md/.exec(key);
    if (match) {
      return `This is **post ${match.groups.number}**.`;
    }
  },
  ["post1.md", "post2.md", "post3.md"]
);
