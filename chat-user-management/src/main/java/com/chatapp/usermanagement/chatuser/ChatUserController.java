package com.chatapp.usermanagement.chatuser;

import com.chatapp.usermanagement.configuration.ValidUUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

@RestController
@RequestMapping("/user/{userId}")
@Validated
public class ChatUserController {

    @Autowired
    private ChatUserService chatUserService;

    @GetMapping
    public ResponseEntity<ChatUser> getUser(@PathVariable @ValidUUID String userId) {
        return ResponseEntity.ok(
                chatUserService.getUser(userId)
        );
    }

    @PostMapping
    public ResponseEntity<ChatUser> createUser(@PathVariable @ValidUUID String userId,
                                               @RequestBody @Valid ChatUserInput input) {
        ChatUser newChatUser = chatUserService.createUser(userId, input);
        return ResponseEntity.ok(newChatUser);
    }

    @PutMapping
    public ResponseEntity<ChatUser> updateUser(@PathVariable @ValidUUID String userId,
                                               @RequestBody @Valid ChatUserInput input) {
        return ResponseEntity.ok(
                chatUserService.updateUser(userId, input)
        );
    }
}
