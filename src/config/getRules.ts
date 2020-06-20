import isObject from "./utils/isObject";

const getRules = (config) =>
  Object.entries(config).reduce(
    (acc, [k, v]) => ({ ...acc, [k]: isObject(v) ? getRules(v) : v[1] }),
    {}
  );

export default getRules;
