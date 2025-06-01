provider "aws" {
  region = "us-east-1"
}

module "network" {
  source       = "./modules/network"
  project_name = var.project_name
  vpc_cidr             = var.vpc_cidr
  subnet_public_a_cidr = var.subnet_public_a_cidr
  subnet_public_b_cidr = var.subnet_public_b_cidr
  az_a                 = var.az_a
  az_b                 = var.az_b
}

module "database" {
  source        = "./modules/database"
  project_name  = var.project_name
  vpc_id        = module.network.vpc_id
  subnet_id     = module.network.public_subnet_ids[0]
  key_name      = var.key_name
  allowed_cidrs = ["0.0.0.0/0"]
}

module "alb" {
  source            = "./modules/alb"
  project_name      = var.project_name
  vpc_id            = module.network.vpc_id
  subnet_ids        = module.network.public_subnet_ids
  security_group_id = module.network.alb_sg_id
}

module "compute" {
  source            = "./modules/compute"
  project_name      = var.project_name
  ami_id            = var.ami_id
  subnet_id         = module.network.public_subnet_ids[0]
  key_name          = var.key_name
  security_group_id = module.network.app_sg_id
  target_group_arn  = module.alb.target_group_arn
}
