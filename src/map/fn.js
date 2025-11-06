import FunctionMap from "./FunctionMap.js";

// Function to generate markdown for a key of the format "post<n>.md"
function fn(key) {
  const match = /.+(?<number>\d+)\.md/.exec(key);
  if (match) {
    return `This is **post ${match.groups.number}**.`;
  }
}

// Representative domain of the function
const domain = ["post1.md", "post2.md", "post3.md"];

export default new FunctionMap(fn, domain);
