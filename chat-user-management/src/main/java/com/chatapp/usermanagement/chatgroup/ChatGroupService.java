package com.chatapp.usermanagement.chatgroup;

import com.chatapp.usermanagement.repository.DBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatGroupService {

    @Autowired
    private DBService<ChatGroup> dbService;

    public ChatGroup createGroup(String groupId, ChatGroupInput input) {

        if (dbService.exists(groupId)) {
            return dbService.getById(groupId);
        }

        ChatGroup chatGroup = ChatGroup.builder()
                        .chatId(groupId)
                        .chatName(input.getChatName())
                        .build();

        dbService.save(chatGroup);

        return chatGroup;
    }

    public ChatGroup getGroup(String groupId) {
        return dbService.getById(groupId);
    }

    public ChatGroup updateGroup(String groupId, ChatGroupInput input) {
        ChatGroup chatGroup = dbService.getById(groupId);

        if (chatGroup == null) {
            throw new IllegalArgumentException("Group not found. Cache might have reset.");
        }

        ChatGroup updatedChatGroup = chatGroup.toBuilder()
                .chatName(input.getChatName())
                .build();

        dbService.save(updatedChatGroup);

        return updatedChatGroup;
    }
}
