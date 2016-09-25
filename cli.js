#!/usr/bin/env node
var _ = require('lodash');
var async = require('async');
var parsedCLI = require('clarg')();

var config = require('./lib/readConfig');
var mapEC2 = require('./lib/mapEC2');
var mapS3 = require('./lib/mapS3');
var printResultsEC2 = require('./lib/printResultsEC2');
var printResultsS3 = require('./lib/printResultsS3');

var _ArgEnv = parsedCLI.opts.e || parsedCLI.opts.env;
var _ArgMode = parsedCLI.opts.m || parsedCLI.opts.mode;
var _ArgGrep = _.first(parsedCLI.args);

if (!config || !config.configurations) {
  return process.exit(1);
}
var configs = config.configurations;

console.log('---------------------------' + _.pad('AWS mapper', 12) + '---------------------------');


if (_ArgGrep) {
  console.log('Filtering results with phrase "' + _ArgGrep + '"');
}
if (_ArgEnv) {
  var selectedEnv = _ArgEnv;
  if (configs[selectedEnv]) {
    var value = configs[selectedEnv];
    configs = {};
    configs[selectedEnv] = value;
  } else {
    return console.log('Environment "' + _ArgEnv + '" not defined. Available environments are:', Object.keys(configs).join(', ') + '.\n');
  }
}



// Execute everything
async.each(Object.keys(configs), function (key, cb) {
  console.log('Processing account config:', key);
  var cfg = configs[key];

  if (_ArgMode === 's3') {
    return mapS3(cfg, function (err, data) {
      if (err) return cb(err);

      printResultsS3(data, key);
      cb();
    });
  } else {
    return mapEC2(cfg, function (err, data) {
      if (err) return cb(err);

      printResultsEC2(data, key);
      cb();
    });
  }

}, function (err, data) {
  if (err) {
    return console.error(err);
  }
  process.exit(0);
});
