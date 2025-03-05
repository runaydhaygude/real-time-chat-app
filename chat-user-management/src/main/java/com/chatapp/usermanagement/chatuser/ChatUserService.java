package com.chatapp.usermanagement.chatuser;

import com.chatapp.usermanagement.repository.DBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatUserService {

    @Autowired
    private DBService<ChatUser> dbService;

    public ChatUser createUser(String userId, ChatUserInput input) {
        
        if (dbService.exists(userId)) {
            return dbService.getById(userId);
        }
        
        ChatUser chatUser = ChatUser.builder()
                        .userId(userId)
                        .userName(input.getUserName()).build();

        dbService.save(chatUser);

        return chatUser;
    }
    
    public ChatUser getUser(String userId) {
        return dbService.getById(userId);
    }
    
    public ChatUser updateUser(String userId, ChatUserInput input) {
        ChatUser chatUser = dbService.getById(userId);
        
        if (chatUser == null) {
            throw new IllegalArgumentException("User not found. Cache might have reset.");
        }
        
        ChatUser updatedChatUser = chatUser.toBuilder()
                .userName(input.getUserName())
                .build();

        dbService.save(updatedChatUser);
        
        return updatedChatUser;
    }
}
