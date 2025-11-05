import fileMap from "./files.js";
import HtmlMapTransform from "./HtmlMap.js";
import indexPage from "./indexPage.js";
import ObjectMap from "./ObjectMap.js";

const posts = new HtmlMapTransform(fileMap);

export default new ObjectMap({
  "index.html": indexPage(posts),
  posts,
});
