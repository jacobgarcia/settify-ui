/* eslint-env jquery */
const login = {
  get loginButton() {
    return $('//*[@id="root"]/div/div[2]/div/a/button');
  },
  get facebookButton() {
    return $('//*[@id="app"]/body/div[1]/div[2]/div/div[2]/div/a');
  },
  get user() {
    return $('//*[@id="email"]');
  },
  get password() {
    return $('//*[@id="pass"]');
  },
  get facebookLoginButton() {
    return $('//*[@id="loginbutton"]');
  },
  submit(user, password) {
    this.loginButton.click();
    this.facebookButton.click();

    if (user) {
      this.user.setValue(user);
    }

    if (password) {
      this.password.setValue(password);
    }

    this.facebookLoginButton.click();
  },
};

module.exports = login;
