# AWS mapper

[![NPM Version][npm-img]][npm-url]
[![NPM Downloads][npm-dl-img]][npm-url]

[npm-url]: https://npmjs.org/package/awsmap
[npm-img]: https://img.shields.io/npm/v/awsmap.svg
[npm-dl-img]: https://img.shields.io/npm/dm/awsmap.svg


This tool allows you to quickly list EC2 instances, S3 buckets or Elastic
Load Balancers created across all configured AWS accounts at once. grep friendly.

You can limit the execution to one account or use all of them at once.

This does not utilise caching of any sort, you always get live data.

## Installation

```
npm install awsmap -g
```


## Usage

Simply run the script with no arguments to list EC2 instances.

```
awsmap
```

You can also pass some options. First argument will be used as filter/grep.

To list S3 buckets you have to pass `-m s3` (or `--mode s3`) switch.

To list load balancers use `-m elb` (or `--mode elb`) switch.

You can also restrict the mapper to only scan one environment/account
with `-e {environment}` (`--env {environment}`) switch.

Finally, with EC2 you can group the results to see IPs of machines with a certain name
on a single line for a more compact display by using `-g` (`--group`) switch.

```
awsmap product -e dev -g
awsmap product -e prod -m s3
```

## Config file

The only configuration is a simple JSON stored as .awsmap file in your home directory.
You should add all accounts/environments to it in under "configurations" key.

Example:

```
{
  "configurations": {
    "dev": {
      "region": "eu-west-1",
      "accessKeyId": "XXXXXXXXXXXXXXXXXXXX",
      "secretAccessKey": "123456789012345678901234567890234567890x"
    },

    "prod": {
      "region": "eu-west-1",
      "accessKeyId": "XXXXXXXXXXXXXXXXXXXX",
      "secretAccessKey": "123456789012345678901234567890234567890x"
    }
  }
}

```
