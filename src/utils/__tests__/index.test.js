import { parsePercentageToNumber } from '..';

describe('parsePercentageToNumber', () => {
  test('should return the same number if not a string', () => {
    const number = 123;
    const date = new Date();

    expect(parsePercentageToNumber(number)).toBe(123);
    expect(parsePercentageToNumber(date)).toBe(date);
  });
  test('should remove percentage from a string', () => {
    const stringWithPer = '123%';
    const stringWithoutPer = 'ewe';

    expect(parsePercentageToNumber(stringWithPer)).toBe(123);
    expect(parsePercentageToNumber(stringWithoutPer)).toBe('ewe');
  });
});
