package com.chatapp.usermanagement.service;

import com.chatapp.usermanagement.beans.ChatGroup;
import com.chatapp.usermanagement.beans.ChatGroupCreationInput;
import com.chatapp.usermanagement.beans.ChatUser;
import com.chatapp.usermanagement.beans.ChatUserCreationInput;

import java.util.UUID;

public class ChatUserService {

    public ChatUser createUser(ChatUserCreationInput input) {
        ChatUser chatUser = new ChatUser();
        chatUser.setUserId(UUID.randomUUID().toString());
        chatUser.setUserName(input.getUserName());
        return chatUser;
    }
}
