import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

// Resolve a map to an object with string keys and string values.
function plain(map) {
  const result = {};
  // Get each of the values from the map.
  for (const key of map.keys()) {
    const value = map.get(key);
    result[key] = value.toString();
  }
  return result;
}

// Get a file name from the command line.
const [node, command, moduleName] = process.argv;
const modulePath = path.resolve(process.cwd(), moduleName);

// On Windows, import paths must be valid file:// URLs.
const moduleUrl = pathToFileURL(modulePath);

// Load the module.
const module = await import(moduleUrl);

// Take the module's default export as a tree.
const tree = module.default;

// Resolve the tree to an in-memory object.
const obj = plain(tree);

// Convert to JSON text and display it.
const json = JSON.stringify(obj, null, 2);
console.log(json);
