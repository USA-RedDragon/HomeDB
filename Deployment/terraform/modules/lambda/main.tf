data "archive_file" "lambda_zip" {
  output_path = "${path.module}/lambda.zip"
  type        = "zip"

  source_dir = "${path.root}/../../server"
}

resource "aws_lambda_function" "server_lambda" {
  filename         = "${data.archive_file.lambda_zip.output_path}"
  function_name    = "ServerLambda"
  role             = "${aws_iam_role.lambda_exec.arn}"
  handler          = "index.handler"
  source_code_hash = "${base64sha256(file("${data.archive_file.lambda_zip.output_path}"))}"
  runtime          = "nodejs8.10"

  vpc_config {
      subnet_ids = ["${var.subnet_ids}"]
      security_group_ids = ["${var.security_group_id}"]
  }

  environment {
      variables = {
          MYSQL_HOST = "${var.mysql_host}"
          MYSQL_DATABASE = "${var.mysql_database}"
          MYSQL_USER = "${var.mysql_user}"
          MYSQL_PASSWORD = "${var.mysql_password}"
          APP_KEY = "${var.app_key}"
      }
  }

  timeout = 60
  lifecycle {
    ignore_changes = ["filename"]
  }
}

resource "aws_iam_role" "lambda_exec" {
  name = "serverless_example_lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "lambda_exec_policy" {
	name = "serverless_example_lambda_policy"
	role = "${aws_iam_role.lambda_exec.id}"
	
	policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:*"
            ],
            "Resource": "arn:aws:logs:*:*:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2:CreateNetworkInterface",
                "ec2:DescribeNetworkInterfaces",
                "ec2:DeleteNetworkInterface"
            ],
            "Resource": "*"
        }
    ]
}
EOF
}