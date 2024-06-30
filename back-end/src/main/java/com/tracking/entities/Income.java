package com.tracking.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Income")
public class Income {
	@Id
	 @GeneratedValue(strategy=GenerationType.AUTO)
	 private int id;
	private String useremail;
	private  String title;
	private String amount;
	private  String date;
	
	public Income(int id, String useremail, String title, String amount, String date) {
		super();
		this.id = id;
		this.useremail = useremail;
		this.title = title;
		this.amount = amount;
		this.date = date;
	
	}


	public Income() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	

	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getUseremail() {
		return useremail;
	}


	public void setUseremail(String useremail) {
		this.useremail = useremail;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getAmount() {
		return amount;
	}


	public void setAmount(String amount) {
		this.amount = amount;
	}


	public String getDate() {
		return date;
	}


	public void setDate(String date) {
		this.date = date;
	}




	@Override
	public String toString() {
		return "Income [id=" + id + ", useremail=" + useremail + ", title=" + title + ", amount=" + amount + ", date="
				+ date + "]";
	}
	 
	 
	 
}
