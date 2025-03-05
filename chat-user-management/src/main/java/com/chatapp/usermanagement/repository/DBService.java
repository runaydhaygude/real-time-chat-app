package com.chatapp.usermanagement.repository;

public interface DBService<T> {
    void save(T value);
    T getById(String id);
    void delete(String id);
    boolean exists(String id);
}
