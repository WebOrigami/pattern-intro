const domain = ["post1.md", "post2.md", "post3.md"];

// Function to generate markdown for a key of the format "post<n>.md"
function fn(key) {
  const match = /.+(?<number>\d+)\.md/.exec(key);
  if (match) {
    return `This is **post ${match.groups.number}**.`;
  }
}

// Display the function over the given domain in the console.
for (const key of domain) {
  const value = fn(key);
  console.log(`${key}: ${value}`);
}
