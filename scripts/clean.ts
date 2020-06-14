//Run using the following command
//deno run --allow-read=.,../dist/ --allow-write=../dist/ <relative path to file>

Deno.remove("../dist/", { recursive: true });
