package com.chatapp.usermanagement.controller;

import com.chatapp.usermanagement.beans.ChatGroup;
import com.chatapp.usermanagement.beans.ChatGroupCreationInput;
import com.chatapp.usermanagement.service.ChatGroupService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat-group")
public class ChatGroupController {

    @PostMapping("/create")
    public ResponseEntity<ChatGroup> createGroup(ChatGroupCreationInput input) {
        ChatGroup newChatGroup = new ChatGroupService().createChatGroup(input);
        return ResponseEntity.ok(newChatGroup);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<ChatGroup> getGroup(@RequestParam() String groupId) {
        return ResponseEntity.ok(new ChatGroup());

        // return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
}
