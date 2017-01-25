var _ = require('lodash');
var AWS = require('aws-sdk');

module.exports = function (cfg, callback) {
  AWS.config.update(cfg);

  var elb = new AWS.ELB();

  var mapBalancerFn = function (instance) {
    // var instanceTags = _.get(instance, 'Tags', []);
    var map = {
      name: _.get(instance, 'LoadBalancerName', ''),
      dns: _.get(instance, 'DNSName', ''),
      scheme: _.get(instance, 'Scheme', ''),
      instances: _.map(_.get(instance, 'Instances', []), 'InstanceId')
    }
    return map;
  }

  var sortObject = function (object) {
    var sortedObject = {};

    var keys = Object.keys(object);

    keys.sort(function(a, b) {
      var nameA = a.toLowerCase();
      var nameB = b.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    for (var i = 0, size = keys.length; i < size; i++) {
      key = keys[i];
      value = object[key];
      sortedObject[key] = value;
    }

    return sortedObject;
  }

  function listBalancers (callback) {
    var params = {};
    elb.describeLoadBalancers(params, function(err, data) {
      if (err) {
        return callback(err);
      }

      var balancers = _.get(data, 'LoadBalancerDescriptions', []);
      var mapped = _.map(balancers, mapBalancerFn);

      var grouped = _.groupBy(mapped, 'name');
      var sorted = sortObject(grouped);

      callback(null, sorted);
    });
  }


  /* Call everything */
  var fullReturn = {};

  listBalancers(function (err, data) {
    if (err) {
      return callback(err);
    }

    callback(null, data);
  });

}
