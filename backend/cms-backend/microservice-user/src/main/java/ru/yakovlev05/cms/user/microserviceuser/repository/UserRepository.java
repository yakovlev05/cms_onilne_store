package ru.yakovlev05.cms.user.microserviceuser.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.yakovlev05.cms.user.microserviceuser.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByPhoneNumber(String phoneNumber);
    Optional<User> findById(String id);
}
