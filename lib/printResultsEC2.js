var _ = require('lodash');
var parsedCLI = require('clarg')();
var _ArgGrouped = parsedCLI.opts.g || parsedCLI.opts.grouped;
var _ArgGrep = _.first(parsedCLI.args);

function printResultsEC2 (data, key) {
  console.log('------------------------------' + _.pad(key, 6) + '------------------------------');
  var allBoxes = [];

  if (_ArgGrouped) {
    _.each(data, function (group) {
      var allIps = _.map(group, function (i) {
        return _.padEnd(i.ip, 14);
      });
      var ipPrefix = '- ';
      if (group.length > 10) {
        ipPrefix = '\n  ' + ipPrefix;
      }

      var groupObject = {
        name: group[0].name,
        ip: ipPrefix + allIps.join(' - ')
      };
      allBoxes.push(groupObject);
    });
  } else {
    _.each(data, function (group) {
      allBoxes = allBoxes.concat(group);
    });
  }

  // grep here
  if (_ArgGrep) {
    allBoxes = _.filter(allBoxes, function (box) {
      return _.includes(box.name, _ArgGrep);
    });
  }

  _.each(allBoxes, function (box) {
    var result = '* ' + _.padEnd(box.name, 46) + '  ' +  box.ip;
    console.log(result);
  });
}

module.exports = printResultsEC2;
