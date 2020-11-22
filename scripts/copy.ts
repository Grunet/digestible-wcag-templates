import { copy } from "https://deno.land/std@0.78.0/fs/copy.ts";

await copy("../src/", "../dist/", { overwrite: true });
