variable "vpc_cidr" {
  description = "CIDR блок для VPC"
  type        = string
  default     = "10.0.0.0/16"   # можно задать дефолт, либо убрать default и задавать при запуске
}

variable "subnet_public_a_cidr" {
  description = "CIDR блок для публичной подсети A"
  type        = string
  default     = "10.0.1.0/24"
}

variable "subnet_public_b_cidr" {
  description = "CIDR блок для публичной подсети B"
  type        = string
  default     = "10.0.2.0/24"
}

variable "az_a" {
  description = "Зона доступности A"
  type        = string
  default     = "us-east-1a"
}

variable "az_b" {
  description = "Зона доступности B"
  type        = string
  default     = "us-east-1b"
}

variable "project_name" {
  description = "Имя проекта"
  type        = string
  default     = "myproject"
}

variable "key_name" {
  description = "Имя ключа для EC2"
  type        = string
}

variable "ami_id" {
  description = "AMI ID для запуска EC2"
  type        = string
}
