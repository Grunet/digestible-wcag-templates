function generateInterfaceName(templateFilename: string) {
  const nameForInterface = templateFilename.split("-").map((word) =>
    `${word[0].toUpperCase()}${word.substring(1)}`
  ).join(""); //TS doesn't like hyphens in the interface declaration

  return nameForInterface;
}

export { generateInterfaceName };
