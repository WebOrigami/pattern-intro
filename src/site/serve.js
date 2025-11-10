import http from "node:http";
import site from "./site.js";

const port = 5000;

// Convert a path-separated URL into an array of keys.
function keysFromUrl(url) {
  const keys = url.split("/");
  if (keys[0] === "") {
    // The path begins with a slash; drop that part.
    keys.shift();
  }
  if (keys[keys.length - 1] === "") {
    // The path ends with a slash; replace that with index.html as the default key.
    keys[keys.length - 1] = "index.html";
  }
  return keys;
}

// Given a tree, return a listener function that serves the tree.
function requestListener(map) {
  return function (request, response) {
    console.log(request.url);
    const keys = keysFromUrl(request.url);
    let resource;
    try {
      resource = traverse(map, ...keys);
    } catch (error) {
      console.log(error.message);
    }

    if (resource) {
      // Send to client
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(resource);
      return true;
    } else {
      // Not found
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end(`Not found`, "utf-8");
      return false;
    }
  };
}

// Traverse a path of keys through a map.
function traverse(map, ...keys) {
  let current = map;
  for (const key of keys) {
    current = current.get(key);
    if (current === undefined) {
      // Can't go any further
      return undefined;
    }
  }
  return current;
}

// Start the server.
const server = http.createServer(requestListener(site));
server.listen(port, undefined, () => {
  console.log(
    `Server running at http://localhost:${port}. Press Ctrl+C to stop.`
  );
});
