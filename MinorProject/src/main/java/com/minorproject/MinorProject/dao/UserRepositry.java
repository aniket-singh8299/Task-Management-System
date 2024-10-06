package com.minorproject.MinorProject.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.minorproject.MinorProject.model.User;

@Repository

public interface UserRepositry extends JpaRepository<User, Long>{
     
    @Query("SELECT u FROM User u WHERE email = ?1 AND password = ?2")

    User findByEmailAndPassword(String email, String password);

}
