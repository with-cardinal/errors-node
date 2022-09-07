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

export function init(options: Options = defaultOptions) {
  options.errorCallback ||= errorCallback;

  if (isNode) {
    initNode(options);
  }
}

export { initNode };
