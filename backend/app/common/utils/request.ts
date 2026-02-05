export const getStringParam = (value: unknown, field: string): string => {

  if (typeof value !== "string") {
    throw new Error(`${field} must be a string`);
  }

  return value;
};
