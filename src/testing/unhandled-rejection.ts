import * as Errors from "..";

Errors.init({ host: "http://127.0.0.1:8888" });

async function main() {
  throw new Error("Unahandled rejection");
}

main().then(() => null);
