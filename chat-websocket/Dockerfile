
FROM openjdk:11-jre-slim

COPY /target/chat-websocket-0.0.1-SNAPSHOT.jar /usr/src/websockets-server/
WORKDIR /usr/src/websockets-server
EXPOSE 8080
CMD ["java", "-jar", "chat-websocket-0.0.1-SNAPSHOT.jar"]