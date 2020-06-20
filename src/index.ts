import { superstruct, Validator } from "superstruct";
import getTypes from "./checks/getTypes";
import getCustomCoercions from "./checks/getCustomCoercions";
import getErrorMessages from "./checks/getErrorMessages";
import getVars from "./config/getVars";
import getRules from "./config/getRules";
import ConfigValidationError from "./errors/ConfigValidationError";
import { Checks, Config } from "./types";

export default (checks: Checks) => (config: Config) => {
  const types = getTypes(checks);
  const struct = superstruct({ types });
  const validator = struct(getRules(config));

  const customCoercions = getCustomCoercions(checks);

  try {
    return validator(getVars(customCoercions, config));
  } catch (error) {
    const errorMessages = getErrorMessages(checks);
    console.log({ errorMessages });
    throw new ConfigValidationError(error, errorMessages);
  }
};
