package com.real_time_chat_app.chat_websocket.beans;

import lombok.Data;

@Data
public class ChatMessage {

    private String senderId;

    private String senderName;

    private MessageType messageType;

    private String content;

}

