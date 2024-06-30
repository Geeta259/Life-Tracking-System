package com.tracking.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tracking.entities.Expenses;


public interface ExpenseRepository extends JpaRepository<Expenses,Integer>{
	@Query("SELECT u FROM Expenses u WHERE u.useremail = :email")
    List<Expenses> findByEmail(@Param("email") String email);
	
	@Query("SELECT u FROM Expenses u WHERE u.id = :id")
    Expenses findById(@Param("id") int id);
}
