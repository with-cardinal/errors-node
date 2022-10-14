export type SendableError = {
  message: string;
  at: Date;
  stack?: string;
};

export function errorToSendable(e: unknown): SendableError {
  const at = new Date();

  if (e instanceof Error) {
    return {
      message: e.message,
      at,
      stack: e.stack,
    };
  } else {
    return {
      message: String(e),
      at,
    };
  }
}

function defaultErrorCallback(e: unknown) {
  const sendable = errorToSendable(e);
  console.log(sendable);
}

export type Options = {
  errorCallback: typeof defaultErrorCallback;
};

export const defaultOptions = {
  errorCallback: defaultErrorCallback,
};

let _options: Options;
export function init(options: Options = defaultOptions) {
  _options = options;
  process.on("unhandledRejection", send);
  process.on("uncaughtException", send);
}

export function send(e: unknown) {
  _options.errorCallback(e);
}
