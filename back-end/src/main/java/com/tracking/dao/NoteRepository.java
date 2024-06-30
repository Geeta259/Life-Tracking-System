package com.tracking.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.tracking.entities.Notes;

public interface NoteRepository  extends JpaRepository<Notes,Integer> {
	@Query("SELECT u FROM Notes u WHERE u.useremail = :email")
    List<Notes> findByEmail(@Param("email") String email);
	
	@Query("SELECT u FROM Notes u WHERE u.id = :id")
    Notes findById(@Param("id") int id);
}
