import { Checks, CoerceFnsMap } from "../types";

export default (checks: Checks): CoerceFnsMap =>
  Object.entries(checks).reduce((acc, [k, v]) => ({ ...acc, [k]: v[0] }), {});
