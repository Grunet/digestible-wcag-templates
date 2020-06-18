//Run using the following command
//deno run --allow-read=.,../dist/ --allow-write=../dist/ <relative path to file>

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

  //TODO - refactor this code out of extractIntefaces.ts instead of duplicating it (maybe also the loop if possible
  const fileName = dirEntry.name.split(".")[0];
  const nameForInterface = fileName.split("-").map((word) =>
    `${word[0].toUpperCase()}${word.substring(1)}`
  ).join(""); //TS doesn't like hyphens in the interface declaration

  const endpointFileText = endpointBlueprint.replace(
    /TemplateInterfaceName/g,
    nameForInterface,
  ).replace(/TemplateFileName/g, fileName);

  await Deno.writeTextFile(
    `../dist/endpoints/${fileName}.ts`,
    endpointFileText,
  );
}
