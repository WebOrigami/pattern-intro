export default function indexPage(map) {
  // Create links for each key in the map
  const keys = Array.from(map.keys());
  const links = keys.map((key) => {
    const basename = key.replace(/\..+$/, ""); // Remove file extension
    return `      <li><a href="/posts/${key}">${basename}</a></li>`;
  });

  // Incorporate the links into a simple page
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Blog home</title>
  </head>
  <body>
    <h1>Posts</h1>
    <ul>
${links.join("\n")}
    </ul>
  </body>
</html>`;
  return html;
}
