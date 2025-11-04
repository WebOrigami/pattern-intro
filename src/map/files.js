import path from "node:path";
import { fileURLToPath } from "node:url";
import FileMap from "./FileMap.js";

const moduleFolder = path.dirname(fileURLToPath(import.meta.url));
const dirname = path.resolve(moduleFolder, "markdown");

export default new FileMap(dirname);
