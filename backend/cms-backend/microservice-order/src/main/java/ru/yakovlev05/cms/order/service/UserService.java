package ru.yakovlev05.cms.order.service;

import ru.yakovlev05.cms.order.entity.User;

public interface UserService {
    User getById(String id);

    void save(User user);

    void deleteById(String id);
}
