package com.chatapp.usermanagement.cache;

import com.chatapp.usermanagement.chatuser.ChatUser;
import com.chatapp.usermanagement.repository.DBService;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CacheConfig {

    @Bean
    public Cache<String, CacheableObject> guavaCache() {
        return CacheBuilder.newBuilder()
                .maximumSize(100) // Max 100 entries
                .build();
    }

    @Bean
    public DBService<CacheableObject> chatUserDBService(Cache<String, CacheableObject> chatUserCache) {
        return new CacheService<>(chatUserCache);
    }
}