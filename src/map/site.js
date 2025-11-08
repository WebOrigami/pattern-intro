import fileMap from "./files.js";
import HtmlMap from "./HtmlMap.js";
import indexPage from "./indexPage.js";
import ObjectMap from "./ObjectMap.js";

const posts = new HtmlMap(fileMap);

export default new ObjectMap({
  "index.html": indexPage(posts),
  posts,
});
