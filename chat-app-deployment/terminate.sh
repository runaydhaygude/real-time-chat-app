#!/bin/bash


# Uninstall Helm release (replace chat-app-release with your release name)
helm uninstall chat-app-release

# Delete the EKS cluster named 'chat-app'
eksctl delete cluster --name chat-app --region ap-south-1
