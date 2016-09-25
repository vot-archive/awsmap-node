var _ = require('lodash');
var parsedCLI = require('clarg')();
var _ArgGrep = _.first(parsedCLI.args);

function printResultsS3 (data, key) {
  console.log('------------------------------' + _.pad(key, 6) + '------------------------------');
  var allBoxes = data;


  // grep here
  if (_ArgGrep) {
    allBoxes = _.filter(allBoxes, function (box) {
      return _.includes(box, _ArgGrep);
    });
  }

  _.each(allBoxes, function (box) {
    var result = '* ' + box;
    console.log(result);
  });
}

module.exports = printResultsS3;
