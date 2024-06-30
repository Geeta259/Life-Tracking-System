package com.tracking.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tracking.entities.Exercise;

public interface ExerciseRepository  extends JpaRepository<Exercise,Integer>{
	@Query("SELECT u FROM Exercise u WHERE u.uemail = :email")
    List<Exercise> findByEmail(@Param("email") String email);
	
	@Query("SELECT u FROM Exercise u WHERE u.id = :id")
    Exercise findById(@Param("id") int id);
}

