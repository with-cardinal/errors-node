import { SendableError } from "./sendable-error";
import { options } from ".";
import http from "http";
import https from "https";

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

export async function postErrors(errors: SendableError[]): Promise<boolean> {
  const url = new URL("/errors", options.host);
  const proto = url.protocol === "https:" ? https : http;

  const reqOptions = {
    host: url.hostname,
    port: url.port ? url.port : undefined,
    path: `${url.pathname}${url.search}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${options.secret}`,
    },
  };

  console.log(reqOptions);

  return new Promise((resolve, reject) => {
    const cb = (response: http.IncomingMessage) => {
      response.on("end", () => {
        if (response.statusCode && response.statusCode < 300) {
          resolve(true);
        } else {
          console.error("Unexpected status code: ");
          resolve(false);
        }
      });

      response.on("error", reject);
    };
    const req = proto.request(reqOptions, cb);
    req.write(JSON.stringify({ errors }));
    req.end();
  });
}
