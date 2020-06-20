import { expect } from "chai";
import validateConfig from ".";
import { Checks, Config } from "./types";
import { addToProcessEnv, removeFromProcessEnv } from "./test/support";

describe("with some environment variables set", () => {
  const env = {
    AUTH_COOKIE_KEY: "aaiuyyfxcCVJHfdhxffxyesre",
    MAX_AGE_MINUTES: "60",
    SECURE: "false",
  };

  beforeEach(() => addToProcessEnv(env));
  afterEach(() => removeFromProcessEnv(env));

  describe("with user-provided custom checks of type { name: [coercionFn, validator, errorMessage]}", () => {
    const checks: Checks = {
      secret: [
        (v) => v,
        (v) => typeof v === "string" && v.length > 10,
        "should be a string of lenght > 30",
      ],

      port: [
        (v) => Number(v),
        (v) => typeof v === "number" && Number.isInteger(v) && v > 0,
        "should be a positive integer",
      ],
    };

    it("converts a user-provided config object into a valid config with correct types", () => {
      const config: Config = {
        PORT: ["3000", "port"],
        auth: {
          cookie: {
            KEY1: [process.env.AUTH_COOKIE_KEY, "secret"],
            MAX_AGE_MINUTES: [process.env.MAX_AGE_MINUTES, "number"],
            SECURE: [process.env.SECURE !== "false", "boolean"],
          },
        },
      };

      const result = validateConfig(checks)(config);

      const expected = {
        PORT: 3000,
        auth: {
          cookie: {
            KEY1: "aaiuyyfxcCVJHfdhxffxyesre",
            MAX_AGE_MINUTES: 60,
            SECURE: false,
          },
        },
      };

      expect(result).to.eql(expected);
    });
  });
});
