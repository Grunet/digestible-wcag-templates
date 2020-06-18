//Run using the following command
//deno run --unstable --allow-read=.,../src/,../dist/ --allow-write=../dist/ <relative path to file>

// Have to use the "--unstable" flag for this to work. See https://github.com/denoland/deno/issues/5175
import { copy } from "https://deno.land/std@0.57.0/fs/copy.ts";

await copy("../src/", "../dist/", { overwrite: true });