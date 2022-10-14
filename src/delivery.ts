import { SendableError } from "./sendable-error";
import fetch from "node-fetch";
import { options } from ".";

const defaultDelay = 100;
const errorDelay = 5000;

const _queue: SendableError[] = [];
export function enqueue(sendable: SendableError) {
  _queue.push(sendable);
  setTimeout(deliverErrors, defaultDelay);
}

async function deliverErrors() {
  if (_queue.length > 0) {
    const errors = _queue.splice(0, _queue.length);
    let success = true;

    try {
      const response = await fetch(
        new URL("/errors", options.host).toString(),
        {
          method: "POST",
          body: JSON.stringify({ errors }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
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
