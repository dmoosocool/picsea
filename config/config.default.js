'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1526436164912_1879';

  config.security = {
    csrf: false,
  };
  // add your config here
  config.middleware = [];

  return config;
};
