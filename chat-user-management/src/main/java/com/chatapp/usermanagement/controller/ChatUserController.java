package com.chatapp.usermanagement.controller;

import com.chatapp.usermanagement.beans.ChatUser;
import com.chatapp.usermanagement.beans.ChatUserCreationInput;
import com.chatapp.usermanagement.service.ChatUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class ChatUserController {

    @PostMapping("/create")
    public ResponseEntity<ChatUser> createUser(@RequestBody ChatUserCreationInput input) {
        ChatUser newChatUser = new ChatUserService().createUser(input);
        return ResponseEntity.ok(newChatUser);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ChatUser> getUser(@RequestParam() String userId) {
        return ResponseEntity.ok(new ChatUser());

        // return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PutMapping("/update")
    public ResponseEntity<ChatUser> updateUser(@RequestBody ChatUser chatUser) {
        return ResponseEntity.ok(chatUser);

        // return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
}
