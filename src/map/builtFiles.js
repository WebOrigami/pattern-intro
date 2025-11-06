import { fileURLToPath } from "node:url";
import FileMap from "./FileMap.js";

const dirname = fileURLToPath(new URL("build", import.meta.url));

export default new FileMap(dirname);
