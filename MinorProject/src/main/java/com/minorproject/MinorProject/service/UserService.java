package com.minorproject.MinorProject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.minorproject.MinorProject.dao.UserRepositry;
import com.minorproject.MinorProject.util.ResponseStructure;
import com.minorproject.MinorProject.model.User;

@Service
public class UserService {
    @Autowired
    UserRepositry user;

    public ResponseStructure<List<User>> getAllUsers() {
        List<User> users = user.findAll();
        ResponseStructure<List<User>> structure = new ResponseStructure<List<User>>();
        structure.setStatus_code(HttpStatus.OK.value());
        structure.setMessage("Users retrieved successfully");
        structure.setData(users);
        return structure;
    }

    public ResponseEntity<?> savePerson(User u) {
        User savedUser = user.save(u);  

        ResponseStructure<User> structure = new ResponseStructure<User>();
        structure.setStatus_code(HttpStatus.ACCEPTED.value());
        structure.setMessage("User object inserted successfully");
        structure.setData(savedUser); 
        
        return new ResponseEntity<>(structure, HttpStatus.ACCEPTED);
    }


    public ResponseStructure<User> findById(long id) {
        Optional<User> optional = user.findById(id);
        ResponseStructure<User> structure = new ResponseStructure<User>();

        if (optional.isPresent()) {
            structure.setStatus_code(HttpStatus.OK.value());
            structure.setMessage("User retrieved successfully");
            structure.setData(optional.get());
        } else {
            structure.setStatus_code(HttpStatus.NOT_FOUND.value());
            structure.setMessage("User not found");
            structure.setData(null);
        }

        return structure;
    }

    public ResponseStructure<Void> deleteUser(long id) {
        user.deleteById(id);
        ResponseStructure<Void> structure = new ResponseStructure<>();
        structure.setStatus_code(HttpStatus.NO_CONTENT.value());
        structure.setMessage("User deleted successfully");
        structure.setData(null);
        return structure;
    }

    public ResponseStructure<User> loginUser(String email, String password) {
        User u = user.findByEmailAndPassword(email, password);
        ResponseStructure<User> structure = new ResponseStructure<User>();

        if (u != null) {
            structure.setStatus_code(HttpStatus.OK.value());
            structure.setMessage("User logged in successfully");
            structure.setData(u);
        } else {
            structure.setStatus_code(HttpStatus.UNAUTHORIZED.value());
            structure.setMessage("Invalid credentials");
            structure.setData(null);
        }

        return structure;
    }
}
