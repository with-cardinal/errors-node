function defaultErrorCallback(e: unknown) {
  const sendable = errorToSendable(e);
  console.log(sendable);
}

export type Options = {
  secret: string;
  errorCallback: typeof defaultErrorCallback;
};

export const defaultOptions = {
  secret: process.env.ERRORS_SECRET,
  errorCallback: defaultErrorCallback,
};

let _options: Options;
export function init(options: Partial<Options> = defaultOptions) {
  Object.assign(_options, options, defaultOptions);

  process.on("unhandledRejection", send);
  process.on("uncaughtException", send);
}

export function send(e: unknown) {
  _options.errorCallback(e);
}

type SendableError = {
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
