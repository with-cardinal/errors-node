import * as Errors from "..";

Errors.init({ host: "http://127.0.0.1:8888" });
Errors.send(new Error("Something broke"));
