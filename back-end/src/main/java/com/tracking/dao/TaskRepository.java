package com.tracking.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tracking.entities.Task;

import jakarta.transaction.Transactional;

public interface TaskRepository extends JpaRepository<Task,Integer>{
	
	@Query("SELECT u FROM Task u WHERE u.goalId = :id")
    List<Task> findByGoalId(@Param("id") int id);
	
	@Query("SELECT u FROM Task u WHERE u.id = :id")
    Task findById(@Param("id") int id);
	
	@Modifying
    @Transactional
	@Query("DELETE FROM Task u WHERE u.goalId = :id")
    void deleteByGoalId(@Param("id") int id);
}
