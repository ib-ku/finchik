output "alb_dns_name" {
  description = "DNS name of the ALB"
  value       = module.alb.alb_dns_name
}

output "mongodb_public_ip" {
  description = "Public IP of MongoDB instance"
  value       = module.database.mongodb_public_ip
}
