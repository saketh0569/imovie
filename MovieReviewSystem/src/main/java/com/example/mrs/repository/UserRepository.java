package com.example.mrs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.mrs.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	User findByEmailAndPass(String email, String password);
}
