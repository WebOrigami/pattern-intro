const obj = {
  "post1.md": "This is **post 1**.",
  "post2.md": "This is **post 2**.",
  "post3.md": "This is **post 3**.",
};

// Display the object values in the console.
for (const key of Object.keys(obj)) {
  const value = obj[key];
  console.log(`${key}: ${value}`);
}
