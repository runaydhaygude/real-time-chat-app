package com.chatapp.usermanagement.chatgroup;

import com.chatapp.usermanagement.configuration.ValidUUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/chat-group/{groupId}")
public class ChatGroupController {

    @Autowired
    private ChatGroupService chatGroupService;


    @GetMapping("")
    public ResponseEntity<ChatGroup> getGroup(@PathVariable @ValidUUID String groupId) {
        return ResponseEntity.ok(
                chatGroupService.getGroup(groupId)
        );

    }

    @PostMapping
    public ResponseEntity<ChatGroup> createGroup(@PathVariable @ValidUUID String groupId,
                                                 @RequestBody @Valid ChatGroupInput input) {;
        return ResponseEntity.ok(
                chatGroupService.createGroup(groupId, input)
        );
    }

    @PutMapping
    public ResponseEntity<ChatGroup> updateGroup(@PathVariable @ValidUUID String groupId,
                                                 @RequestBody @Valid ChatGroupInput input) {;
        return ResponseEntity.ok(
                chatGroupService.updateGroup(groupId, input)
        );
    }
}
