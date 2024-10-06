package com.minorproject.MinorProject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.minorproject.MinorProject.util.ResponseStructure;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import com.minorproject.MinorProject.model.User;
import com.minorproject.MinorProject.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {
    @Autowired
    UserService us;

    @GetMapping
    public ResponseStructure<List<User>> getAllUsers() {
        return us.getAllUsers();
    }

    @PostMapping("save")
	public ResponseEntity<?> savePerson(@RequestBody User u ,@Autowired HttpServletResponse response) {
		
//		Cookie c=new Cookie("name","ANIKET");
//		Cookie c1=new Cookie("email","anikeykrs@gmail.com");
//		response.addCookie(c);
//		response.addCookie(c1);
		

		
		return us.savePerson(u);
		
		
	}

    @GetMapping("find/{id}")
    public ResponseStructure<User> findById(@PathVariable long id) {
        return us.findById(id);
    }

    @DeleteMapping("/delete")
    public ResponseStructure<Void> deleteById(@RequestParam long id) {
        return us.deleteUser(id);
    }

    @GetMapping("/login/{email}/{password}")
    public ResponseStructure<User> login(@PathVariable String email, @PathVariable String password) {
        return us.loginUser(email, password);
    }
}
