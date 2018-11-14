provider "aws" {
  region     = "${var.region}"
  access_key = "${var.access_key}"
  secret_key = "${var.secret_key}"
}

module "networking" {
  source   = "modules/networking"
  name     = "HomeDB"
}

resource "aws_security_group" "default" {
  vpc_id      = "${module.networking.vpc_id}"
  name        = "homedb"

  ingress {
    protocol    = "tcp"
    from_port   = 3306
    to_port     = 3306
    cidr_blocks = ["${module.networking.vpc_cidr}"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }
}

module "rds" {
  source   = "modules/rds"
  name     = "HomeDB"
  aws_name = "homedb"
  subnet_ids = ["${module.networking.public_subnet_id}", "${module.networking.public_second_subnet_id}"]
  security_group_id = "${aws_security_group.default.id}"
  mysql_username = "${data.terraform_remote_state.state.mysql_username}"
  mysql_password = "${data.terraform_remote_state.state.mysql_password}"
}

module "lambda" {
  source   = "modules/lambda"
  subnet_ids = ["${module.networking.public_subnet_id}", "${module.networking.public_second_subnet_id}"]
  security_group_id = "${aws_security_group.default.id}"
  mysql_host = "${module.rds.rds_endpoint}"
  mysql_user = "${data.terraform_remote_state.state.mysql_username}"
  mysql_password = "${data.terraform_remote_state.state.mysql_password}"
  mysql_database = "homedb"
  app_key = "${data.terraform_remote_state.state.app_key}"
}

module "api_gateway" {
  source   = "modules/api_gateway"
  lambda_invoke_arn = "${module.lambda.lambda_invoke_arn}"
  lambda_arn = "${module.lambda.lambda_arn}"
}
