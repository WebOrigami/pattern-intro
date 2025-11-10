import fileMap from "./files.js";
import HtmlMap from "./HtmlMap.js";
import indexPage from "./indexPage.js";

const posts = new HtmlMap(fileMap);

export default new Map([
  ["index.html", indexPage(posts)],
  ["posts", posts],
]);
