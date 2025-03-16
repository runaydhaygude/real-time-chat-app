#!/bin/bash

set -e  # Exit immediately if a command fails

# Check if logged in to Docker
if ! docker info > /dev/null 2>&1; then
  echo "You are not logged in to Docker. Please enter your Docker Hub credentials."
  read -p "Username: " username
  read -sp "Password: " password
  echo
  echo "$password" | docker login --username "$username" --password-stdin
  if [ $? -ne 0 ]; then
    echo "Docker login failed. Please check your credentials."
    exit 1
  fi
fi

# Create and use a builder instance
docker buildx create --use

# Define services and their build contexts
services=(
    "chat-frontend ../chat-frontend npm"
    "chat-user-management ../chat-user-management mvn"
    "chat-websocket ../chat-websocket mvn"
    "rabbitmq-with-stomp ../rabbitmq-with-stomp docker"
)

version="amd"

for service in "${services[@]}"; do
    name=$(echo $service | cut -d ' ' -f1)
    path=$(echo $service | cut -d ' ' -f2)
    package_manager=$(echo $service | cut -d ' ' -f3)

    cd "$path"

    if [ "$package_manager" == "npm" ]; then
        echo "Installing dependencies for $name..."
        npm install
        npm run build
    elif [ "$package_manager" == "mvn" ]; then
        echo "Building $name..."
        mvn clean install
    else
        echo "No packaging"
    fi


    image="runaydhaygude/$name:$version"

    echo "Building $name..."
    docker buildx build --platform linux/amd64 --load -t "$image" .

    echo "Tagging $image..."
    docker tag "$image" "$image"

    echo "Pushing $image..."
    docker push "$image"
done

echo "All images built and pushed successfully!"

