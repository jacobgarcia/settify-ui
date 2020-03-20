/* global browser */
const login = require('./login.page.js');
require('dotenv').config();

const { FACEBOOK_USER, FACEBOOK_PASSWORD } = process.env;

describe('Settify happy path showcase', () => {
  it('Runs successfully', () => {
    browser.url('/');
    login.submit(FACEBOOK_USER, FACEBOOK_PASSWORD);
    browser.debug();
  });
});
