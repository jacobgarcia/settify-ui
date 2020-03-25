/* global browser */
const login = require('./login.page.js');
const playlists = require('./playlists.page.js');
const notification = require('./notification.page.js');
require('dotenv').config();

const { FACEBOOK_USER, FACEBOOK_PASSWORD } = process.env;

describe('Settify happy path showcase', () => {
  it('Runs intersection successfully (Happy Path)', () => {
    browser.url('/');
    login.submit(FACEBOOK_USER, FACEBOOK_PASSWORD);

    /* Playlists section */
    playlists.firstElement.waitForExist();
    playlists.firstCheckBox.click();

    playlists.secondElement.waitForExist();
    playlists.secondCheckBox.click();

    browser.pause(3000);
    playlists.intersectionButton.click();

    browser.pause(3000);
    notification.continueButton.waitForExist();
    notification.continueButton.click();
  });
});
