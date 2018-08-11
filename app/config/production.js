import config from './qa';
const CONFIG = {
  ...config,
  env: 'production',
  UAL_BASE_URL: 'https://www.united.com',
  ENSIGHTEN_BOOTSTRAP: 'https://nexus.ensighten.com/united/UnitedProd_v3/Bootstrap.js',
  COOKIE_DOMAIN: '.united.com',
};

export default CONFIG;
