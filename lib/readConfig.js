var fs = require('fs');

function readConfigFile() {
  var filePath = process.env.HOME + '/.awsmap';
  var fileExists = fs.existsSync(filePath);
  if (!fileExists) {
    return console.log('Config file does not exist. Make sure to create .awsmap file in your home directory.');
  }

  var contents = fs.readFileSync(filePath);
  try {
    return JSON.parse(contents.toString());
  } catch (e) {
    return console.log('Config file is not valid JSON.');
  }
}

module.exports = readConfigFile();
