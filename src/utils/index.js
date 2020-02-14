import { formatValue } from '@credijusto/ui-components';
// Receives a number and rounds its decimals to 2:
export const roundToTwo = (num) => Math.round(num * 100) / 100;

export const isString = (value) => typeof value === 'string';

export const isNumber = (value, { strictType } = { strictType: true }) => {
  if (strictType) {
    return typeof value === 'number';
  }
  return !Number.isNaN(value);
};

// Receives a percentage value and returns the value as Number:
export const parsePercentageToNumber = (value) => {
  // regex to test if a string is a number
  const stringIsNumberRegex = /^\d+(\.\d{1,})?$/;
  // If the value is already a Number, return the same value.
  if (isNumber(value)) {
    return value;
  }
  if (isString(value) && value.includes('%')) {
    return +value.replace(/%/g, '');
  }
  if (isString(value) && stringIsNumberRegex.test(value)) {
    return parseFloat(value);
  }
  return value;
};

// Remove the prefix and commas:
export const parseCurrencyToString = (currencyString) =>
  currencyString.replace(/\$|,/g, '');

// Receives an object with percentage values and parses those values to numbers:
export const removePercentageStringsFromObject = (obj) =>
  Object.entries(obj).reduce((acc, [currKey, currValue]) => {
    const parsedValue = parsePercentageToNumber(currValue);
    return {
      ...acc,
      [currKey]: isString(parsedValue) ? currValue : parsedValue,
    };
  }, {});

export const formatMoney = (value) => formatValue(value, { isCurrency: true });

export const isNil = (value) => value == null;

export const formatNumberToString = (num, minChars = 1) =>
  num.toString().length < minChars
    ? formatNumberToString(`0${num}`, minChars)
    : num.toString();

export const arrayBufferToString = (buffer, encoding = 'utf8') =>
  Buffer.from(buffer).toString(encoding);
