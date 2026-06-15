const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const directories = [
  path.join(__dirname, '../../database'),
  path.join(__dirname, '../../logs'),
  path.join(__dirname, '../../uploads')
];

function initializeDirectories() {
  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      logger.info(`Created directory: ${dir}`);
    }
  });
}

module.exports = { initializeDirectories };
