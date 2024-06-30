package com.tracking.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tracking.entities.Income;

public interface IncomeRepository extends JpaRepository<Income,Integer>{
	@Query("SELECT u FROM Income u WHERE u.useremail = :email")
    List<Income> findByEmail(@Param("email") String email);
	
	@Query("SELECT u FROM Income u WHERE u.id = :id")
    Income findById(@Param("id") int id);
}
