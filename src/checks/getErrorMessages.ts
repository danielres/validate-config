import { Checks } from "../types";

export default (
  checks: Checks
): {
  [key: string]: string;
} =>
  Object.entries(checks).reduce((acc, [k, v]) => ({ ...acc, [k]: v[2] }), {});
