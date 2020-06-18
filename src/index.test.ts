import { expect } from "chai";
import validateConfig from ".";

export interface StringMap {
  [key: string]: string;
}

const removeFromProcessEnv = (entries: StringMap) =>
  Object.entries(entries).map(
    ([k, v]: [string, string]) => delete process.env[k]
  );

const addToProcessEnv = (entries: StringMap) =>
  Object.entries(entries).map(
    ([k, v]: [string, string]) => (process.env[k] = v)
  );

describe("basic test", () => {
  const env = {
    AUTH_COOKIE_KEY: "aaiuyyfxcCVJHfdhxffxyesre",
    MAX_AGE_MINUTES: "60",
    SECURE: "false",
  };

  beforeEach(() => addToProcessEnv(env));
  afterEach(() => removeFromProcessEnv(env));

  it("works", () => {
    const checks = {
      secret: [
        (v: string) => typeof v === "string" && v.length > 10,
        String,
        "should be a string of lenght > 30",
      ],
    };

    const config = {
      auth: {
        cookie: {
          KEY1: [process.env.AUTH_COOKIE_KEY, "secret"],
          MAX_AGE_MINUTES: [process.env.MAX_AGE_MINUTES, "number"],
          SECURE: [process.env.SECURE !== "false", "boolean"],
        },
      },
    };

    const output = validateConfig(checks)(config);
  });
});
4;
