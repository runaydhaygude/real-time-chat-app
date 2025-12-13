# Real-Time Chat App

## Prerequisites
1. Install the following tools:
   - AWS CLI
   - Kubernetes CLI (`kubectl`)
   - `eksctl`
   - Helm

2. Configure AWS CLI with an IAM role that has the necessary permissions for creating and managing EKS clusters.

## Deployment
1. To create an EKS cluster and deploy the chat application using Helm, run the following script:
   ```bash
   ./chat-app-deployment/start.sh

## Teardown
1. To uninstall the Helm project and delete the EKS cluster, run:
   ```bash
   ./chat-app-deployment/terminate.sh
   ```

## Building and Pushing Docker Images
1. Use the `docker-build.sh` script to build and push Docker images for the application to Docker Hub. This script allows you to choose the architecture for the build:
    - **`arm` (latest)**: For Apple Silicon devices.
    - **`amd64`**: For AWS or other devices requiring `amd64` compatibility.

   Run the script as follows:
   ```bash
   ./chat-app-deployment/docker-build.sh
   ```
   Follow the prompts to select the desired architecture and ensure the images are pushed to Docker Hub.
```