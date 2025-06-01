Sure! Here's the README file translated into English for your Terraform + AWS CI/CD project:

---

# CI/CD Project with Terraform and AWS

## Description

This project demonstrates the implementation of a CI/CD pipeline for a sample application using Terraform to automate infrastructure deployment on AWS. The pipeline includes stages for code integration, testing, and automatic deployment.

---

## Project Features

* Infrastructure as Code with Terraform
* Using AWS for resource provisioning
* Secure handling of AWS credentials via environment variables
* Automation of integration and delivery processes

---

## Project Structure

```
/terraform        # Terraform configuration files  
/app              # Application source code  
/.github          # GitHub Actions configuration (if used)  
README.md         # This file  
```

---

## Requirements

* Installed [Terraform](https://terraform.io)
* AWS account with permissions to create resources
* AWS CLI configured or environment variables set for AWS access (AWS\_ACCESS\_KEY\_ID and AWS\_SECRET\_ACCESS\_KEY)
* Node.js (if applicable for your app)

---

## Setup and Usage

1. **Clone the repository:**

```bash
git clone https://github.com/ib-ku/finchik.git
cd finchik
node server.js
```

2. **Set AWS credentials:**

Export your AWS keys into environment variables (do not store keys in code):

```bash
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
```

3. **Initialize Terraform and apply configuration:**

```bash
cd terraform
terraform init
terraform apply
```

4. **Run the CI/CD pipeline**

The pipeline runs automatically on code push, performing tests, builds, and deployments.

---

## Using AWS in the Project

Terraform provisions AWS resources such as:

* EC2 instances
* S3 buckets for storing Terraform state
* IAM roles and policies for security

AWS credentials are managed securely through environment variables and are not stored in the repository.

---

## Useful Links

* [Terraform Documentation](https://www.terraform.io/docs)
* [AWS Documentation](https://docs.aws.amazon.com/)
* [GitHub Actions](https://docs.github.com/en/actions) (if used)
