package com.tracking.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Expenses")
public class Expenses {
	@Id
	 @GeneratedValue(strategy=GenerationType.AUTO)
	 private int id;
	private String useremail;
	private  String title;
	private String amount;
	private  String date;
	 private String category;
	public Expenses() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Expenses(int id, String useremail, String title, String amount, String date, String category) {
		super();
		this.id = id;
		this.useremail = useremail;
		this.title = title;
		this.amount = amount;
		this.date = date;
		this.category = category;
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
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	@Override
	public String toString() {
		return "Expenses [id=" + id + ", useremail=" + useremail + ", title=" + title + ", amount=" + amount + ", date="
				+ date + ", category=" + category + "]";
	}
	 
	 
}
