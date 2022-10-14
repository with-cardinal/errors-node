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
