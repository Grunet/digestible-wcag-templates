import { ISuccessCriterionFocused as IOverrideInfo } from "../interfaces/ISuccessCriterionFocused.ts";

async function getTemplateHtml(): Promise<string> {
  const pathToHtml = import.meta.url
    .replace("endpoints", "templates")
    .replace(".ts", ".html");

  let html: string;
  if (import.meta.url.startsWith("http")) {
    const res = await fetch(pathToHtml);

    html = new TextDecoder("utf-8").decode(
      new Uint8Array(await res.arrayBuffer()),
    );
  } else if (import.meta.url.startsWith("file")) {
    html = await Deno.readTextFile(new URL(pathToHtml));
  } else {
    throw Error(
      "import.meta.url doesn't seem to be pointing to a networked resource or a local file",
    );
  }

  return html;
}

export { getTemplateHtml }
export type { IOverrideInfo }
