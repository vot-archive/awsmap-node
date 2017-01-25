var _ = require('lodash');
var parsedCLI = require('clarg')();
var _ArgGrouped = parsedCLI.opts.g || parsedCLI.opts.grouped;
var _ArgGrep = _.first(parsedCLI.args);

function printResultsEC2 (data, key) {
  console.log('------------------------------' + _.pad(key, 6) + '------------------------------');
  var allBoxes = [];

  _.each(data, function (group) {
    allBoxes = allBoxes.concat(group);
  });

  // grep here
  if (_ArgGrep) {
    allBoxes = _.filter(allBoxes, function (box) {
      return _.includes(box.name, _ArgGrep);
    });
  }

  _.each(allBoxes, function (box) {
    var result = '* ' + _.padEnd(box.name, 46) + '  ' +  _.padEnd('(' + box.scheme + ')', 20) + '  ' + box.dns;
    console.log(result);
  });

  // console.log(data);
}

module.exports = printResultsEC2;
