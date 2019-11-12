{
  "Version": "2012-10-17",
    "Id": "S3PolicyId1",
      "Statement": [
        {
          "Sid": "IPAllow",
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:*",
          "Resource": "arn:aws:s3:::hybrid-lms/*",
          "Condition": {
            "IpAddress": {
              "aws:SourceIp": "202.62.78.109/24"
            }
          }
        }
      ]
}