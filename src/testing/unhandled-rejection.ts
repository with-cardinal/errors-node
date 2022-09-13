import * as Errors from "../node";

Errors.init({
  errorCallback: () => {
    console.error(process.argv[2]);
    process.exit(1);
  },
});

async function main() {
  throw new Error("Unahandled rejection");
}

main().then(() => null);
