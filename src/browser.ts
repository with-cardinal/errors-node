import { _init, defaultOptions, Options } from "./config";

type ErrorsWindow = Window & { Errors: { init: typeof init } };
declare let window: ErrorsWindow;

function init(options: Options = defaultOptions) {
  _init(options);

  window.onerror = (msg, url, line, column, err) => {
    options.errorCallback(err);
  };

  window.onunhandledrejection = (evt) => {
    options.errorCallback(evt.reason);
  };
}

window.Errors = { init };
