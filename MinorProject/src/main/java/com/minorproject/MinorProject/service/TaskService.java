package com.minorproject.MinorProject.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.minorproject.MinorProject.model.Task;
import com.minorproject.MinorProject.model.User;
import com.minorproject.MinorProject.util.ResponseStructure;
import com.minorproject.MinorProject.dao.TaskRepositry;
import com.minorproject.MinorProject.dao.UserRepositry;

@Service
public class TaskService {
	@Autowired
	TaskRepositry tr;
	
	@Autowired
    UserRepositry urep;

	public List<Task> getAllTasks(){
		return tr.findAll();	
	}
	
	public void updateTask(Task newTask, long taskId) {
        Task existingTask = tr.findById(taskId)
            .orElseThrow(() -> new RuntimeException("Task not found"));
        
        existingTask.setTitle(newTask.getTitle());
        existingTask.setDescription(newTask.getDescription());
        existingTask.setStatus(newTask.getStatus());
        existingTask.setDue_date(newTask.getDue_date());
        existingTask.setPriority(newTask.getPriority());

        tr.save(existingTask);
    }
	public void  deleteTask(@RequestParam long id) {
		tr.deleteById(id);
		
	}

	
	

	public void saveTask(Task t, long id)
	{
		
		 Optional<User> optional = urep.findById(id);
		 if (optional.isPresent())
		 {
			 User u=optional.get();
			 u.getTasks().add(t);  
		        t.setAssignedTo(u);      
		        tr.save(t);
		        urep.save(u);
			
		 }
		 
	}
	
	public Set<Task> getTasksByUserId(long userId) {
        Optional<User> optionalUser = urep.findById(userId);
        if (!optionalUser.isPresent()) {
            throw new RuntimeException("User not found");
        }
        User user = optionalUser.get();
        return user.getTasks(); 
    }

	

	
		
	
}