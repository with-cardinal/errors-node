import { defaultOptions, Options } from ".";

export function initNode(options: Options = defaultOptions) {
  process.on("unhandledRejection", options.errorCallback);
  process.on("uncaughtException", options.errorCallback);
}
