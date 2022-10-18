import * as Errors from "..";

Errors.init({ host: "http://localhost:8888" });

async function main() {
  throw new Error("Unahandled rejection");
}

main().then(() => null);
