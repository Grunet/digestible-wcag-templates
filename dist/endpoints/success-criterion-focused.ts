import { ISuccessCriterionFocused as IOverrideInfo } from "../interfaces/ISuccessCriterionFocused.ts";

async function getTemplateHtml(): Promise<string> {
  // const res = await fetch("./templates/success-criterion-focused.html");

  // const resBody = new TextDecoder("utf-8").decode(
  //   new Uint8Array(await res.arrayBuffer()),
  // );

  // return resBody;
  if (import.meta.url.startsWith("http")) {
    throw Error(import.meta.url);
  }

  const pathToHtml = import.meta.url
    .replace("endpoints", "templates")
    .replace(".ts", ".html");
  const html = await Deno.readTextFile(pathToHtml);

  return html;
}

export { getTemplateHtml, IOverrideInfo };
