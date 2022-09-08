import { isNode } from "browser-or-node";
import { initNode } from "./node";

function errorCallback(e: unknown) {
  console.log(e);
}

export type Options = {
  errorCallback: typeof errorCallback;
};

export const defaultOptions = {
  errorCallback: errorCallback,
};

let _options: Options;

const initialized = false;
export function init(options: Options = defaultOptions) {
  if (initialized) {
    throw new Error("Errors initialized multiple times");
  }

  _options = options;

  if (isNode) {
    initNode();
  }
}

export function send(e: unknown) {
  _options.errorCallback(e);
}
