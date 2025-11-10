import { fileURLToPath } from "node:url";
import FileMap from "./FileMap.js";

const dirname = fileURLToPath(new URL("markdown", import.meta.url));

export default new FileMap(dirname);
