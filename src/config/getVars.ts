import isObject from "./utils/isObject";

const coerceFactory = (customCoercions) => (rule, value) => {
  const coercionsMap = {
    boolean: Boolean,
    number: Number,
    string: String,
    ...customCoercions,
  };

  if (coercionsMap[rule]) return coercionsMap[rule](value);
  throw new Error(`Coercion rule ${rule} missing.`);
};

const getVars = (customCoercions, configObj) => {
  const coerce = coerceFactory(customCoercions);

  return Object.entries(configObj).reduce(
    (acc, [k, v]) => ({
      ...acc,
      [k]: isObject(v) ? getVars(customCoercions, v) : coerce(v[1], v[0]),
    }),
    {}
  );
};
export default getVars;
