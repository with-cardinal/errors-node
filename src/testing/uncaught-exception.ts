import * as Errors from "..";

Errors.init({
  errorCallback: () => {
    console.error(process.argv[2]);
    process.exit(1);
  },
});

throw new Error("Something broke");
