package com.real_time_chat_app.chat_websocket.beans;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum MessageType {
    CHAT("chat"),
    USER_ACTION("user-action");


    private final String messageType;
    MessageType(String messageType) {
        this.messageType = messageType;
    }

    @JsonCreator
    public MessageType fromString(String messageType) {
        for (MessageType type : MessageType.values()) {
            if (type.messageType.equalsIgnoreCase(messageType)) {
                return type;
            }
        }
        return null;
    }

    @JsonValue
    public String getMessageType() {
        return messageType;
    }
}
