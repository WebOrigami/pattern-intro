import buildFiles from "./buildFiles.js";
import copy from "./copy.js";
import site from "./site.js";

buildFiles.clear();
copy(site, buildFiles);
