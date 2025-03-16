#!/bin/bash

# Create EKS cluster with name 'chat-app'
eksctl create cluster --name chat-app --region ap-south-1 --node-type t2.medium --nodes 2 --nodes-min 2 --nodes-max 3 --managed

# Create the 'chat' namespace
kubectl create namespace chat
# Create the 'chat' namespace
kubectl create namespace ingress-nginx

# Install the Ingress controller
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install ingress-nginx ingress-nginx/ingress-nginx --namespace ingress-nginx

# Install Helm chart for the chat application
helm install chat-app-release chat-app-deployment/chart --namespace chat
