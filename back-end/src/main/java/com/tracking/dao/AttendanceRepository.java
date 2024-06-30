package com.tracking.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tracking.entities.Attendance;

import jakarta.transaction.Transactional;

@Transactional
public interface AttendanceRepository extends JpaRepository<Attendance, Integer>{
	List<Attendance> findByMonth(Integer month);
	
	@Modifying
    @Query("DELETE FROM Attendance a WHERE a.month = :month AND a.day = :day")
    void deleteByMonthAndDay( @Param("month") int month, @Param("day") int day);
	
	@Modifying
    @Query("DELETE FROM Attendance a WHERE a.year!= :year")
    void deleteOldYear( @Param("year") int year);
}
