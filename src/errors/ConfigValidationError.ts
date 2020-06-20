import { StructError } from "superstruct";

export default class ConfigValidationError extends Error {
  errors: object[];

  constructor(error: StructError, messages: Record<string, string>) {
    super();
    const count = error.failures.length;
    this.message = `${count} errors.`;
    this.name = "ConfigValidationError";
    this.errors = error.failures.map((f) => ({
      type: f.type,
      path: f.path.join("."),
      value: f.value,
      message: messages[f.type],
    }));
  }
}
