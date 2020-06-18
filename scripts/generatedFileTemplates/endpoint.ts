import { ITemplateInterfaceName as IOverrideInfo } from "../interfaces/ITemplateInterfaceName.ts";

async function getTemplateHtml(): Promise<string> {
  // const res = await fetch("./templates/TemplateFileName.html");

  // const resBody = new TextDecoder("utf-8").decode(
  //   new Uint8Array(await res.arrayBuffer()),
  // );

  // return resBody;

  const pathToHtml = import.meta.url
    .replace("endpoints", "templates")
    .replace(".ts", ".html");
  const html = await Deno.readTextFile(pathToHtml);

  return html;
}

export { getTemplateHtml, IOverrideInfo };
