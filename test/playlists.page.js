/* eslint-env jquery */
const playlists = {
  get firstCheckBox() {
    return $('//*[@id="3Qi9Nsfsat5XaqZTYltJzm"]');
  },
  get firstElement() {
    return $(
      '//*[@id="root"]/div/div[1]/div/div[2]/div[3]/div/div/table/tbody/tr[10]'
    );
  },
  get secondCheckBox() {
    return $('//*[@id="4urdbfyGHSORGtQvpjmO48"]');
  },
  get secondElement() {
    return $(
      '//*[@id="root"]/div/div[1]/div/div[2]/div[3]/div/div/table/tbody/tr[12]'
    );
  },
  get intersectionButton() {
    return $('//*[@id="root"]/div/div[1]/div/div[2]/div[1]/button[1]');
  },
};

module.exports = playlists;
