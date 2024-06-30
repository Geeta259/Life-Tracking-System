package com.tracking.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Notes")
public class Notes {
	@Id
	 @GeneratedValue(strategy=GenerationType.AUTO)
	 private int id;
	private String useremail;
	private  String notes;
	private  String date;
	public Notes() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Notes(int id, String notes, String date,String useremail) {
		super();
		this.id = id;
		this.notes = notes;
		this.date = date;
		this.useremail=useremail;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getUseremail() {
		return useremail;
	}
	public void setUseremail(String useremail) {
		this.useremail = useremail;
	}
	@Override
	public String toString() {
		return "Notes [id=" + id + ", useremail=" + useremail + ", notes=" + notes + ", date=" + date + "]";
	}
	
	
}
