package com.chatapp.usermanagement.chatuser;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ChatUserInput {

    @NotBlank(message = "User name cannot be empty or null")
    private String userName;

}
