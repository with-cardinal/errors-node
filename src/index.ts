import { errorToSendable } from "./sendable-error";
import { enqueue, deliverImmediate } from "./deliver-errors";

export type Options = {
  secret: string;
  host: string;
};

export const defaultOptions = {
  secret: process.env.ERRORS_SECRET || "",
  host: process.env.ERRORS_HOST || "https://errors.withcardinal.com",
};

export const options: Options = defaultOptions;
export function init(initOptions: Partial<Options> = defaultOptions) {
  Object.assign(options, initOptions);
  Object.freeze(options);

  process.on("unhandledRejection", unhandled);
  process.on("uncaughtException", unhandled);
}

export function send(e: unknown) {
  const sendable = errorToSendable(e);
  enqueue(sendable);
}

export function unhandled(e: unknown) {
  const sendable = errorToSendable(e);

  enqueue(sendable, true);
  deliverImmediate()
    .then(() => {
      console.error(e);
      process.exit(1);
    })
    .catch((err) => console.error("Error while delivering errors", err));
}
