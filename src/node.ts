import { send } from ".";

export function initNode() {
  process.on("unhandledRejection", send);
  process.on("uncaughtException", send);
}
