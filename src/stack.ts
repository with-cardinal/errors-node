const stackLineRegex = /\s*at\s+(.*)\s+\((.*):(\d+):(\d+)\)/;

export type StackFrame = {
  at: string;
  file: string;
  line: number;
  column: number;
};

export type SendableError = {
  message: string;
  at: Date;
  stack?: (StackFrame | string)[];
};

export function errorToSendable(e: Error): SendableError {
  return {
    message: e.message ? e.message : e.toString(),
    at: new Date(),
    stack: e.stack ? parseStack(e.stack) : undefined,
  };
}

function parseStack(stack: string): SendableError["stack"] {
  const allLines = stack.split("\n");
  const stackLines = allLines.slice(1);
  return stackLines.map((line) => {
    const match = line.match(stackLineRegex);
    if (match) {
      return {
        at: match[1],
        file: match[2],
        line: parseInt(match[3]),
        column: parseInt(match[4]),
      };
    }

    return line;
  });
}
