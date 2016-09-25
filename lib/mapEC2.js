var _ = require('lodash');
var AWS = require('aws-sdk');

module.exports = function (cfg, callback) {
  AWS.config.update(cfg);

  var ec2 = new AWS.EC2();

  var mapInstanceFn = function (instance) {
    var instanceTags = _.get(instance, 'Tags', []);
    var map = {
      name: (_.find(instanceTags, {'Key': 'Name'}) || {}).Value,
      env: (_.find(instanceTags, {'Key': 'aop_env'}) || {}).Value,
      role: (_.find(instanceTags, {'Key': 'aop_role'}) || {}).Value,
      ip: _.map(_.get(instance, 'NetworkInterfaces', []), 'PrivateIpAddress').join(','),
      state: _.get(instance, 'State.Name', ''),
      stateReason: _.get(instance, 'StateReason.Message', ''),
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

  function listInstances (callback) {
    var params = {
      MaxResults: 1000
    };
    ec2.describeInstances(params, function(err, data) {
      if (err) {
        return callback(err);
      }

      var reservations = _.get(data, 'Reservations', []);
      var allInstances = _.flatten(_.map(reservations, 'Instances'));
      var mappedInstances = _.map(allInstances, mapInstanceFn);

      var aliveInstances = _.filter(mappedInstances, function (i) {
        return i.state === 'running' && i.name && i.name.length && i.ip && i.ip.length;
      });

      var groupedInstances = _.groupBy(aliveInstances, 'name');
      var sortedGroups = sortObject(groupedInstances);

      callback(null, sortedGroups);
    });
  }


  /* Call everything */
  var fullReturn = {};

  listInstances(function (err, data) {
    if (err) {
      callback(err);
    }

    callback(null, data);
  });

}
