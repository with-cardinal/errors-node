import { SendableError } from "./sendable-error";
import { postErrors } from "./post-errors";

const errorDelay = 5000;

const _queue: SendableError[] = [];
export function enqueue(sendable: SendableError, skipSchedule = false) {
  _queue.push(sendable);

  if (!skipSchedule) {
    deliverErrors();
  }
}

export async function deliverErrors() {
  if (_queue.length > 0) {
    const errors = _queue.splice(0, _queue.length);
    let success = true;

    try {
      const result = await postErrors(errors);

      if (!result) {
        success = false;
      }
    } catch (e) {
      success = false;
    }

    if (!success) {
      _queue.push(...errors);
      setTimeout(deliverErrors, errorDelay);
    }
  }
}

export async function deliverImmediate() {
  if (_queue.length > 0) {
    const errors = _queue.splice(0, _queue.length);

    try {
      await postErrors(errors);
    } catch (e) {
      _queue.push(...errors);
      throw e;
    }
  }
}
