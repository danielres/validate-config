<h1 align="center">
  validate-config
</h1>

<p align="center">
  A hassle-free, DRY, reliable & smarter way to handle configs for your all your apps.
  <br/>
  Monorepo-fiendly.
</p>

<br/>

<p align="center">
  <a href="#usage">Usage</a> •
  <a href="#why">Why?</a> •
  <a href="#recommended-patterns">Recommended patterns</a> •
  <a href="#principles">Principles</a> •
  <a href="#examples">Examples</a>
</p>

<br/>

`validate-config` makes it easy to ensure that your config is valid across all your environments and workspaces.

It allows you to reliably convert environment variables to the proper types.

It prevents deployments when environment variables are missing or invalid.

`validate-config` also enables you to use some very convenient patterns to increase your productivity in the way you handle environment variables and your apps configs.

<br/>

## Usage

### 1. Simple example with `require`

#### 1.1. Create your file `config.js`:

```javascript
// config.js

const validate = require("@danielres/validate-config");

const config = {
  PORT: [process.env.PORT_API, "port"],
};

const checks = {
  port: [
    (v) => Number(v), // Your conversion function from the env var (string) to the type your app needs.
    (v) => Number.isInteger(v) && v > 0, // Your validation function for the converted variable.
    "should be a positive integer", // Error message in case above validation fails.
  ],
};

export default validate(checks)(config);
```

#### 1.2. Use it in your server app:

```javascript
// server.js

const express = require("express");
const config = require("./config");

const { PORT } = config;

console.log(typeof PORT); // => "number"

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(PORT, () => {
  console.log(`Server ready on http://localhost:${PORT}`);
});
```

### 2. Advanced example, this time with `import`:

```js
import validateConfig from "@danielres/validate-config";

const SECURE = process.env.SECURE !== "false";

const config = {
  PORT: [process.env.PORT_API, "port"],
  SECURE: [SECURE, "boolean"],

  auth: {
    cookie: {
      KEY: [process.env.API_AUTH_COOKIE_KEY1_SECRET, "secret"],
      MAX_AGE_MINUTES: [process.env.API_AUTH_COOKIE_MAX_AGE_MINUTES, "number"],
    },
  },

  bcrypt: {
    SALT_ROUNDS: [
      env.BCRYPT_SALT_ROUNDS,
      SECURE ? "saltRoundsSecure" : "saltRoundsInsecure",
    ],
  },

  cors: {
    ORIGIN: [process.env.CORS_ORIGIN, "string"],
  },
};

const checks = {
  port: [
    (v) => Number.isInteger(v) && v > 0,
    Number,
    "should be a positive integer",
  ],
  saltRoundsInsecure: [
    (v) => Number.isInteger(v) && v > 0,
    Number,
    "should be an integer > 10",
  ],
  saltRoundsSecure: [
    (v) => Number.isInteger(v) && v > 10,
    Number,
    "should be a positive integer",
  ],
  secret: [
    (v) => typeof v === "string" && v.length > 30,
    String,
    "should be a string of lenght > 30",
  ],
};

export default validateConfig(checks)(config);
```

## Why?

There are many ways of handling environment variables, and to handle the config of your application.

Unfortunately, they tend to introduce a lot pf potential for human error and lead to cumbersome patterns, and tricky to maintain applications.

## Recommended patterns

Validate-config really shines once used in conjunction with [env-cmd](https://github.com/toddbluhm/env-cmd).

<br/>

## Principles

1. **Principle one** Explanation [TODO]

2. **Principle two** Explanation [TODO]

<br/>

### Examples

- [Basic](./examples/basic/) [TODO]
- [With env-cmd](./examples/env-cmd) [TODO]
- [With env-cmd: advanced](./examples/env-cmd-advanced) [TODO]
- [With env-cmd + yarn workspaces (frontend + backend)](./examples/env-cmd-advanced-yarn-workspaces) [TODO]
- [Advanced example](./examples/advanced) [TODO]

<br/>

### License

This package is [MIT-licensed](./LICENSE).
