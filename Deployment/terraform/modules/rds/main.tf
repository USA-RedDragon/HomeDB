resource "aws_db_subnet_group" "default" {
  name        = "${var.aws_name}"
  subnet_ids  = ["${var.subnet_ids}"]

  tags {
    Name = "${var.name}"
  }
}

resource "aws_rds_cluster" "default" {
  cluster_identifier      = "${var.aws_name}"
  vpc_security_group_ids  = ["${var.security_group_id}"]
  db_subnet_group_name    = "${aws_db_subnet_group.default.name}"
  engine_mode             = "serverless"
  master_username         = "${var.mysql_username}"
  master_password         = "${var.mysql_password}"
  backup_retention_period = 1
  skip_final_snapshot     = false

  scaling_configuration {
    auto_pause               = true
    max_capacity             = 4
    min_capacity             = 2
    seconds_until_auto_pause = 300
  }

  lifecycle {
    ignore_changes = [
      "engine_version",
    ]
  }
}
