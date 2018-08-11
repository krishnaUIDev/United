import config from './development';
const CONFIG = {
  ...config,
  env: 'qa',
  COOKIE_DOMAIN: '.united.com',
};

export default CONFIG;
