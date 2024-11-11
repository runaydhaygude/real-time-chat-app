# real-time-chat-app
1. Install aws, kubernetes, eksctl and helm
2. configure aws with the IAM role that has necessary access for EKS cluster creation
3. run ./chat-app-deployment/start.sh to create an eks cluster and deploy the chat app helm project
4. run ./chat-app-deployment/terminate.sh to uninstall helm project and delete the eks cluster

