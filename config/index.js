const {
    NODE_ENV = 'development',
  } = process.env;
  const CONFIG_FILE_PATH = `${__dirname}/${NODE_ENV}.config.json`;
  
  const fs = require('fs');
  
  
  async function initConfig() {
    const fileData = fs.readFileSync(CONFIG_FILE_PATH, { encoding: 'utf8', flag: 'r' });
    const config = JSON.parse(fileData);
    return config;
  }
  

  const allowedOrigins = ['*'];
  
  function getAllowedOrigins() {
    return allowedOrigins;
  }
  
  module.exports = {
    initConfig,
    getAllowedOrigins,
  };
  