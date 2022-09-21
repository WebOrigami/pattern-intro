import { marked } from "marked";

export default function (graph) {
  return {
    async *[Symbol.asyncIterator]() {
      for await (const markdownKey of graph) {
        const htmlKey = markdownKey.replace(/\.md$/, ".html");
        yield htmlKey;
      }
    },

    async get(key) {
      if (key.endsWith(".html")) {
        const markdownKey = key.replace(/\.html$/, ".md");
        const markdown = await graph.get(markdownKey);
        if (markdown) {
          return marked(markdown.toString());
        }
      } else {
        return graph.get(key);
      }
    },
  };
}
