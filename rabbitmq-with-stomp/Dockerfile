# Use the official RabbitMQ image with the management plugin
FROM rabbitmq:3.8-management

# Enable the desired RabbitMQ plugins
RUN rabbitmq-plugins enable --offline rabbitmq_stomp

# Expose the necessary ports
EXPOSE 5672 15672 61613

CMD [ "rabbitmq-server" ]