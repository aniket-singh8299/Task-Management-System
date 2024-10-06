package com.minorproject.MinorProject.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.minorproject.MinorProject.model.Task;
import com.minorproject.MinorProject.model.User;
import com.minorproject.MinorProject.util.ResponseStructure;

@Repository
public interface TaskRepositry extends JpaRepository<Task, Long>{

	List<Task> findByAssignedTo(User user);

}