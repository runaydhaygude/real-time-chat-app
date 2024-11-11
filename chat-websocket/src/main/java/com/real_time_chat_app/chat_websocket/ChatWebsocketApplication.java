package com.real_time_chat_app.chat_websocket;

import com.real_time_chat_app.chat_websocket.configuration.BrokerConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(BrokerConfig.class)
public class ChatWebsocketApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChatWebsocketApplication.class, args);
	}

}
