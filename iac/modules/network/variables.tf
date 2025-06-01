variable "project_name" {
  type    = string
  default = "myapp"
}

variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "subnet_public_a_cidr" {
  type    = string
  default = "10.0.1.0/24"
}

variable "subnet_public_b_cidr" {
  type    = string
  default = "10.0.2.0/24"
}

variable "az_a" {
  type    = string
  default = "us-east-1a"
}

variable "az_b" {
  type    = string
  default = "us-east-1b"
}
