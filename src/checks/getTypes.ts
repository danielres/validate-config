import { Checks } from "../types";
import { Validator } from "superstruct";

export default (checks: Checks): Record<string, Validator> =>
  Object.entries(checks).reduce((acc, [k, v]) => ({ ...acc, [k]: v[1] }), {});
