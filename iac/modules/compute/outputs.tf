output "launch_template_id" {
  value = aws_launch_template.app.id
}

output "autoscaling_group_name" {
  value = aws_autoscaling_group.app_asg.name
}
