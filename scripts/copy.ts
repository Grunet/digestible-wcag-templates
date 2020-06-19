import { copy } from "https://deno.land/std@0.57.0/fs/copy.ts";

await copy("../src/", "../dist/", { overwrite: true });
