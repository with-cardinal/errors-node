import * as Errors from "..";

Errors.init({ host: "http://localhost:8888" });

throw new Error("Something broke");
