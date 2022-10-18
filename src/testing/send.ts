import * as Errors from "..";

Errors.init({ host: "http://localhost:8888" });
Errors.send(new Error("Something broke"));
