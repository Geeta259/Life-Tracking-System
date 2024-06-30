package com.tracking.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tracking.entities.Goal;



public interface GoalRepository extends JpaRepository<Goal,Integer>{
	@Query("SELECT u FROM Goal u WHERE u.useremail = :email")
    List<Goal> findByEmail(@Param("email") String email);
	
	@Query("SELECT u FROM Goal u WHERE u.id = :id")
    Goal findById(@Param("id") int id);
}
