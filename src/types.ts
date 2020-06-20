type CoercedValue = boolean | number | string;

type CoerceFn = (value: string) => CoercedValue;

export type CoerceFnsMap = {
  [key: string]: CoerceFn;
};

type ErrorMessage = string;

export type Checks = Record<
  string,
  [CoerceFn, (coercedValue: CoercedValue) => boolean, ErrorMessage]
>;

export type Config = {
  [key: string]: Config | [string | boolean | number, string];
};
