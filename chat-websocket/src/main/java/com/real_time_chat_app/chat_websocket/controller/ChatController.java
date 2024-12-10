package com.real_time_chat_app.chat_websocket.controller;

import com.real_time_chat_app.chat_websocket.beans.ChatMessage;
import org.apache.logging.log4j.message.SimpleMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Value("${server.servlet.context-path}")
    private String contextPath;

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat/{chatId}")
    public void handleChatMessage(@DestinationVariable String chatId, ChatMessage message) {

        System.out.print(message);
        simpMessagingTemplate.convertAndSend(contextPath + "/topic/chat/" + chatId, message);
    }

}
