
FROM openjdk:11-jre-slim

COPY /target/chat-user-management-0.0.1-SNAPSHOT.jar /usr/src/user-management-server/
WORKDIR /usr/src/user-management-server
EXPOSE 8080
CMD ["java", "-Dspring.profiles.active=prod", "-jar", "chat-user-management-0.0.1-SNAPSHOT.jar"]