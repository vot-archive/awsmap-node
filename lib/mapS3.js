var _ = require('lodash');
var AWS = require('aws-sdk');

module.exports = function (cfg, callback) {
  AWS.config.update(cfg);

  var s3 = new AWS.S3();

  function listBuckets (callback) {
    s3.listBuckets(function(err, data) {
      if (err) {
        return callback(err);
      }

      var buckets = _.get(data, 'Buckets', []);
      var bucketNames = _.map(buckets, 'Name');
      callback(null, bucketNames);
    });
  }

  listBuckets(function (err, data) {
    if (err) {
      callback(err);
    }

    callback(null, data);
  });

}
