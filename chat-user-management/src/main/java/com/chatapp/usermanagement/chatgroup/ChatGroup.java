package com.chatapp.usermanagement.chatgroup;

import com.chatapp.usermanagement.cache.CacheableObject;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ChatGroup implements CacheableObject {

    private String chatId;
    private String chatName;

    @JsonIgnore
    public String getId() {
        return chatId;
    }
}
