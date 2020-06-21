import { generateInterfaceName } from "./sharedUtils/calculateFilenames.ts";

const endpointBlueprint: string = await Deno.readTextFile(
  "./generatedFileTemplates/endpoint.ts",
);

try {
  await Deno.mkdir("../dist/endpoints/");
} catch (e) {
  //directory already exists
}

const decoder = new TextDecoder("utf-8");
for await (const dirEntry of Deno.readDir("../dist/templates/")) {
  const data = await Deno.readFile("../dist/templates/" + dirEntry.name);
  const html: string = decoder.decode(data);

  const fileName = dirEntry.name.split(".")[0];
  const nameForInterface = generateInterfaceName(fileName);

  const endpointFileText = endpointBlueprint.replace(
    /TemplateInterfaceName/g,
    nameForInterface,
  ).replace(/TemplateFileName/g, fileName);

  await Deno.writeTextFile(
    `../dist/endpoints/${fileName}.ts`,
    endpointFileText,
  );
}
