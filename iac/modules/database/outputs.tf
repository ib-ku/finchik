output "mongodb_instance_id" {
  value = aws_instance.mongodb.id
}

output "mongodb_security_group_id" {
  value = aws_security_group.mongodb_sg.id
}
output "mongodb_public_ip" {
  value = aws_instance.mongodb.public_ip
}
