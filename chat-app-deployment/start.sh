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

echo "Creating EKS cluster..."
echo "Cluster Name: chat-app"
echo "Region: $AWS_REGION"
echo "Node Type: t2.medium"
echo "Number of Nodes: 2 (min: 2, max: 3)"
eksctl create cluster \
  --name chat-app \
  --region "$AWS_REGION" \
  --node-type t2.medium \
  --nodes 2 \
  --nodes-min 2 \
  --nodes-max 3 \
  --managed

# Create the 'chat' namespace
kubectl delete namespace chat --ignore-not-found
kubectl create namespace chat
# Create the 'ingress-nginx' namespace
kubectl delete namespace ingress-nginx --ignore-not-found
kubectl create namespace ingress-nginx

# Install the Ingress controller
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install ingress-nginx ingress-nginx/ingress-nginx --namespace ingress-nginx

# Install Helm chart for the chat application
helm install chat-app-release ./real-time-chat-app-chart --namespace chat --set image.tag="amd64"
