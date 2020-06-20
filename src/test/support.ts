type EnvVarsMap = Record<string, string>;

export const removeFromProcessEnv = (entries: EnvVarsMap) =>
  Object.entries(entries).map(([k]: [string, string]) => delete process.env[k]);

export const addToProcessEnv = (entries: EnvVarsMap) =>
  Object.entries(entries).map(
    ([k, v]: [string, string]) => (process.env[k] = v)
  );
