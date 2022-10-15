process.env.ERRORS_HOST = "http://localhost:8001";
process.env.ERRORS_SECRET =
  "str-aEVVSLZyyCRoU4U2QKmRro:b0bkMh080yvhuELEro-LuhZfbf4dAK7_";

import { postErrors } from "./delivery";

async function main() {
  await postErrors([{ message: "test message", at: new Date() }]);
}

main().then(() => null);
