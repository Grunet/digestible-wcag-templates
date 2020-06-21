import { generateInterfaceName } from "./sharedUtils/calculateFilenames.ts";

try {
  await Deno.mkdir("../dist/interfaces/");
} catch (e) {
  //directory already exists
}

const decoder = new TextDecoder("utf-8");
for await (const dirEntry of Deno.readDir("../dist/templates/")) {
  const data = await Deno.readFile("../dist/templates/" + dirEntry.name);
  const html: string = decoder.decode(data);

  const fileName = dirEntry.name.split(".")[0];
  const nameForInterface = generateInterfaceName(fileName);

  await __extractInterfaceFromTemplate(nameForInterface, html);
}

import cheerio from "https://dev.jspm.io/cheerio@1.0.0-rc.3";

async function __extractInterfaceFromTemplate(
  interfaceName: string,
  htmlTemplate: string,
) {
  const placeholderIdentifiers = __extractPlaceholderIdentifiers(
    htmlTemplate,
  );

  const fileContent = __generateInterfaceText(
    interfaceName,
    placeholderIdentifiers,
  );

  const pathToNewFile = `../dist/interfaces/I${interfaceName}.ts`;
  await Deno.writeTextFile(
    pathToNewFile,
    fileContent,
  );

  //TODO - figure out how to use Deno.run to run "deno fmt" on this new file (will require full --allow-run permission until https://github.com/denoland/deno/issues/2128 is addressed)
  //Deno.run({ cmd: ["deno", "fmt"], cwd: "../dist/interfaces/" });
}

function __extractPlaceholderIdentifiers(
  htmlTemplate: string,
): IPlaceholderIdentifiers {
  const $ = cheerio.load(htmlTemplate);

  const contentSlots = $("slot");
  const slotNames = contentSlots.map(function (this: any) {
    return $(this).attr("name");
  }).toArray();

  const overridableAnchors = $("a[id]");
  const anchorIds = overridableAnchors.map(function (this: any) {
    return $(this).attr("id");
  }).toArray();

  return {
    slotNames: slotNames,
    anchorIds: anchorIds,
  };
}

interface IPlaceholderIdentifiers {
  slotNames: string[];
  anchorIds: string[];
}

function __generateInterfaceText(
  interfaceName: string,
  placeholderIdentifiers: IPlaceholderIdentifiers,
) {
  const { slotNames, anchorIds } = placeholderIdentifiers;

  const interfaceContentObj = {
    content: Object.fromEntries(
      slotNames.map((name: string) => [name, "string"]),
    ),
    links: Object.fromEntries(
      anchorIds.map((id: string) => [id, "string"]),
    ),
  };

  const interfaceContent: string = JSON.stringify(
    interfaceContentObj,
    undefined,
    4,
  )
    .replace(/"string"/g, "string");

  const fileContent =
    `interface I${interfaceName} \n${interfaceContent}\n export {I${interfaceName}}`;

  return fileContent;
}
