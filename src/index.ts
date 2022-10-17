import { errorToSendable } from "./sendable-error";
import { enqueue } from "./deliver-errors";

export type Options = {
  secret: string;
  host: string;
  errorCallback: typeof defaultErrorCallback;
};

export const defaultOptions = {
  secret: process.env.ERRORS_SECRET || "",
  host: process.env.ERRORS_HOST || "https://errors.withcardinal.com",
  errorCallback: defaultErrorCallback,
};

export const options: Options = defaultOptions;
export function init(initOptions: Partial<Options> = defaultOptions) {
  Object.assign(options, initOptions);
  Object.freeze(options);

  process.on("unhandledRejection", send);
  process.on("uncaughtException", send);
}

function defaultErrorCallback(e: unknown) {
  const sendable = errorToSendable(e);
  enqueue(sendable);
}

export function send(e: unknown) {
  options.errorCallback(e);
}
