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
export function _init(options: Options) {
  _options = options;
}

export function send(e: unknown) {
  _options.errorCallback(e);
}
