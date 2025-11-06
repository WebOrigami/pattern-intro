import builtFiles from "./builtFiles.js";
import copy from "./copy.js";
import site from "./site.js";

builtFiles.clear();
copy(site, builtFiles);
