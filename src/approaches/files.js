import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the path of the markdown folder relative to this JavaScript file.
const moduleFolder = path.dirname(fileURLToPath(import.meta.url));
const markdownFolder = path.resolve(moduleFolder, "markdown");

// Display the files in the console.
const filenames = fs.readdirSync(markdownFolder);
for (const filename of filenames) {
  const filePath = path.join(markdownFolder, filename);
  const content = fs.readFileSync(filePath);
  console.log(`${filename}: ${content}`);
}
