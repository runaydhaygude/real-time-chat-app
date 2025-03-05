package com.chatapp.usermanagement.chatuser;

import com.chatapp.usermanagement.cache.CacheableObject;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ChatUser implements CacheableObject {

    private String userId;
    private String userName;

    @JsonIgnore
    public String getId() {
        return userId;
    }

}
