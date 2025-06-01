variable "project_name" {
  type    = string
  default = "myapp"
}

variable "vpc_id" {
  type = string
}

variable "subnet_id" {
  type = string
}

variable "key_name" {
  type = string
}

variable "ami_id" {
  type    = string
  default = "ami-042e8287309f5df03"
}

variable "allowed_cidrs" {
  type    = list(string)
  default = ["0.0.0.0/0"]
}
