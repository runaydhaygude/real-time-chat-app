package com.real_time_chat_app.chat_websocket.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * WebSocketConfig is a configuration class that sets up WebSocket messaging
 * support in a Spring application.
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${server.servlet.context-path}")
    private String contextPath;

    @Autowired
    BrokerConfig brokerConfig;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/websocket-connection")
                .setAllowedOrigins("http://localhost:4200").withSockJS();
    }


    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        if (!brokerConfig.isUseExternalBroker()) {
            config.enableSimpleBroker(contextPath + "/topic");
            config.setApplicationDestinationPrefixes(contextPath + "/app");
            return;
        }

        config.enableStompBrokerRelay(contextPath + "/topic", contextPath + "/queue")
                .setRelayHost(brokerConfig.getExternalBrokerHost())
                .setRelayPort(brokerConfig.getExternalBrokerPort())
                .setClientLogin(brokerConfig.getExternalBrokerClientLogin())
                        .setClientPasscode(brokerConfig.getExternalBrokerClientPasscode());
        config.setApplicationDestinationPrefixes(contextPath + "/app");
    }
}
