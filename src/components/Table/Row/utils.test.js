import { getFinalLink } from './utils';

const row = {
  id: '1',
  name: 'pablito_mix',
};

describe('TableRow utils', () => {
  test('Should format a simple link', () => {
    const linkTo = '/:id';
    expect(getFinalLink(linkTo, row)).toBe(`/${row.id}`);
  });

  test('Should format multiple keys link', () => {
    const linkTo = '/:id/test/:name';
    expect(getFinalLink(linkTo, row)).toBe(`/${row.id}/test/${row.name}`);
  });

  test('Should return the string without keys', () => {
    const linkTo = '/test';
    expect(getFinalLink(linkTo, row)).toBe(linkTo);
  });

  test('Should return an empty string if no link is provided', () => {
    expect(getFinalLink(undefined, row)).toBe('');
  });
});
