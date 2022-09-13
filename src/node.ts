import { _init, send, defaultOptions, Options } from "./config";

export function init(options: Options = defaultOptions) {
  _init(options);

  process.on("unhandledRejection", send);
  process.on("uncaughtException", send);
}
