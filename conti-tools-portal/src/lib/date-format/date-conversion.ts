export const toUTC = (value: Date) => {
  const userTimezoneOffset = value.getTimezoneOffset() * 60000;
  return new Date(value.getTime() - userTimezoneOffset);
};

export const fromUTC = (value: Date) => {
  const userTimezoneOffset = value.getTimezoneOffset() * 60000;
  return new Date(value.getTime() + userTimezoneOffset);
};
