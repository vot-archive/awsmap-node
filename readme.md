# AWS mapper

This tool allows you to quickly list all EC2 instances or S3 buckets created
in an AWS account.

You can add multiple accounts and toggle between them.

## Usage

Simply run the script with no arguments to list everything.

```
awsmap
```

You can also pass some options. First argument will be used as filter/grep.

To list S3 buckets you have to pass -m s3 (or --mode s3) switch.

You can also restrict the mapper to only scan one environment with -e (or --env) switch.

Finally you can group the results to see all IPs of machines with a certain name
on a single line by using -g (--group) switch.

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
