package com.minorproject.MinorProject.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping; // Import GetMapping
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.minorproject.MinorProject.model.Task;
import com.minorproject.MinorProject.model.User;
import com.minorproject.MinorProject.service.TaskService;
import com.minorproject.MinorProject.service.UserService;
import com.minorproject.MinorProject.util.ResponseStructure;

@RestController
@CrossOrigin
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    TaskService ts;
    @Autowired
    UserService userService;

    @PostMapping("/savetask/{id}")
    public void saveTask(@RequestBody Task t, @PathVariable long id) {
        ts.saveTask(t, id);
    }

    @DeleteMapping("/delete")
    public void deleteTaskById(long id) {
        ts.deleteTask(id);
    }

    @GetMapping 
    public List<Task> getAllTasks() {
        return ts.getAllTasks(); 
    }
    
    @PutMapping("/update/{taskId}")
    public void updateTask(@RequestBody Task t, @PathVariable long taskId) {
        ts.updateTask(t, taskId);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<Set<Task>> getTasksByUserId(@PathVariable long userId) {
        Set<Task> tasks = ts.getTasksByUserId(userId);

        if (tasks.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(tasks); // Return 204 if no tasks found
        }

        return ResponseEntity.ok(tasks); 
    }


    
    
}

