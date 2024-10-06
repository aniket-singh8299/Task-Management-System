package com.minorproject.MinorProject.model;

import java.util.Set;

import org.springframework.stereotype.Component;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="User_Table")
@Component
@Getter
@Setter


public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private long id;
	private String name;
	private String email;
	private String password;
	
	private Role role;
	
	@OneToMany(mappedBy = "assignedTo",cascade=CascadeType.ALL)
	
	private Set<Task> tasks;
	
	
	
	

}
