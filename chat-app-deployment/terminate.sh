#!/bin/bash

set -e

AWS_REGION="ap-south-1"

echo "Checking AWS authentication..."

if aws sts get-caller-identity >/dev/null 2>&1; then
  echo "AWS credentials already configured."
else
  echo "AWS not authenticated. Please enter credentials."
  read -p "AWS Access Key ID: " AWS_ACCESS_KEY_ID
  read -s -p "AWS Secret Access Key: " AWS_SECRET_ACCESS_KEY
  echo
  read -p "Default region [$AWS_REGION]: " INPUT_REGION
  AWS_REGION=${INPUT_REGION:-$AWS_REGION}

  aws configure set aws_access_key_id "$AWS_ACCESS_KEY_ID"
  aws configure set aws_secret_access_key "$AWS_SECRET_ACCESS_KEY"
  aws configure set region "$AWS_REGION"

  echo "AWS credentials configured."
fi

# Uninstall Helm release (replace chat-app-release with your release name)
helm uninstall chat-app-release

# Delete the EKS cluster named 'chat-app'
eksctl delete cluster \
  --name chat-app \
  --region "$AWS_REGION"
