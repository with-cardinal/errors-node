import * as Errors from "..";

Errors.init({ host: "http://127.0.0.1:8888" });

throw new Error("Something broke");
