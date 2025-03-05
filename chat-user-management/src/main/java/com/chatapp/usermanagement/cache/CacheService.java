package com.chatapp.usermanagement.cache;

import com.chatapp.usermanagement.repository.DBService;
import com.google.common.cache.Cache;
import org.springframework.stereotype.Service;

@Service
public class CacheService<T extends CacheableObject> implements DBService<T> {

    private final Cache<String, T> cache;

    public CacheService(Cache<String, T> cache) {
        this.cache = cache;
    }

    public void save(T value) {
        cache.put(value.getId(), value);
    }

    public T getById(String key) {
        return cache.getIfPresent(key);
    }

    public boolean exists(String key) {
        return cache.getIfPresent(key) != null;
    }

    public void delete(String key) {
        cache.invalidate(key);
    }

    public long size() {
        return cache.size();
    }
}

