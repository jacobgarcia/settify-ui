/* eslint-env jquery */
const notification = {
  get continueButton() {
    return $('/html/body/div[1]/div/div[1]/div/div[2]/div[2]/div/div/button');
  },
};

module.exports = notification;
