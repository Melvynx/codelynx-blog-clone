import rehypeShiki from "@shikijs/rehype";
import { transformerNotationHighlight } from "@shikijs/transformers";
import type { ShikiTransformer } from "shiki/core";
import type { PluggableList } from "unified";

const getFileName = (raw?: string): string | null => {
  if (!raw) return null;

  const items = raw.split(" ");
  for (const item of items) {
    const splitItem = item.split(".");

    if (splitItem.length === 1) continue;

    const extension = splitItem.at(-1);

    if (extension?.length === 0) continue;

    return splitItem.join(".");
  }
  return null;
};

const transformerMetadataLanguageClassName = (): ShikiTransformer => {
  let language = "js";
  let fileName: string | null = null;

  return {
    preprocess(tree, fileInfo) {
      language = fileInfo.lang;
      fileName = getFileName(fileInfo.meta?.__raw);
    },
    code() {
      this.addClassToHast(this.pre, `language-${language}`);
      this.pre.properties.dataLanguage = language;

      if (fileName) {
        this.addClassToHast(this.pre, `filename-${fileName}`);
        this.pre.properties.dataFileName = fileName;
      }
    },
  };
};

const shikiPlugin = [
  rehypeShiki,
  {
    theme: "github-dark",
    transformers: [
      transformerNotationHighlight(),
      transformerMetadataLanguageClassName(),
    ],
  },
] satisfies PluggableList[number];

export const rehypePlugin = [shikiPlugin] satisfies PluggableList;
