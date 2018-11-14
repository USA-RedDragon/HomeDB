output "mysql_password" {
  value = "${data.terraform_remote_state.state.mysql_password}"
}

output "mysql_username" {
  value = "${data.terraform_remote_state.state.mysql_username}"
}

output "rds_endpoint" {
  value = "${module.rds.rds_endpoint}"
}

output "invoke_url" {
  value = "${module.api_gateway.invoke_url}"
}

output "app_key" {
  value = "${data.terraform_remote_state.state.app_key}"
}
