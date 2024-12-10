package com.chatapp.usermanagement.service;

import com.chatapp.usermanagement.beans.ChatGroup;
import com.chatapp.usermanagement.beans.ChatGroupCreationInput;

import java.util.UUID;

public class ChatGroupService {

    public ChatGroup createChatGroup(ChatGroupCreationInput input) {
        ChatGroup chatGroup = new ChatGroup();
        chatGroup.setChatId(UUID.randomUUID().toString());
        chatGroup.setChatName(input.getChatName());
        return chatGroup;
    }
}
