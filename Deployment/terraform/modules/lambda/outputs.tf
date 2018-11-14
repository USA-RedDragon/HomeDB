output "lambda_invoke_arn" {
  value = "${aws_lambda_function.server_lambda.invoke_arn}"
}

output "lambda_arn" {
  value = "${aws_lambda_function.server_lambda.arn}"
}
