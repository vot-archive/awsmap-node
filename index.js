var awsmap = {
  config: require('./lib/readConfig'),
  mapEC2: require('./lib/mapEC2'),
  mapELB: require('./lib/mapELB'),
  mapS3: require('./lib/mapS3'),
  printResultsEC2: require('./lib/printResultsEC2'),
  printResultsELB: require('./lib/printResultsELB'),
  printResultsS3: require('./lib/printResultsS3')
}

module.exports = awsmap;
