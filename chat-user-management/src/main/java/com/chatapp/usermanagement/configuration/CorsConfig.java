package com.chatapp.usermanagement.configuration;

import org.springframework.web.servlet.config.annotation.CorsRegistry;

public interface CorsConfig {
    void addCorsMappings(CorsRegistry registry);
}
