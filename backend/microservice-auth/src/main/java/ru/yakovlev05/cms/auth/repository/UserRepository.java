package ru.yakovlev05.cms.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.yakovlev05.cms.auth.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(long id);
}
