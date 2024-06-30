package com.tracking.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Goal")
public class Goal {
	@Id
	 @GeneratedValue(strategy=GenerationType.AUTO)
	 private int id;
	 private String category;
	 private String useremail;
	 private String goal;
	 private String description;
	 private String deadline;
	 private String currdate;
	 private String priority;
	 private  String reminder;
	 
	public Goal() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Goal(int id, String category, String useremail, String goal, String description, String deadline,
			String currdate,String priority, String attachment, String reminder) {
		super();
		this.id = id;
		this.category = category;
		this.useremail = useremail;
		this.goal = goal;
		this.description = description;
		this.deadline = deadline;
		this.currdate = currdate;
		this.priority = priority;
		this.reminder = reminder;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getUseremail() {
		return useremail;
	}
	public void setUseremail(String useremail) {
		this.useremail = useremail;
	}
	public String getGoal() {
		return goal;
	}
	public void setGoal(String goal) {
		this.goal = goal;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getDeadline() {
		return deadline;
	}

	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}

	public String getCurrdate() {
		return currdate;
	}

	public void setCurrdate(String currdate) {
		this.currdate = currdate;
	}

	public String getPriority() {
		return priority;
	}
	public void setPriority(String priority) {
		this.priority = priority;
	}
	
	public String getReminder() {
		return reminder;
	}
	public void setReminder(String reminder) {
		this.reminder = reminder;
	}

	@Override
	public String toString() {
		return "Goal [id=" + id + ", category=" + category + ", useremail=" + useremail + ", goal=" + goal
				+ ", description=" + description + ", deadline=" + deadline + ", currdate=" + currdate + ", priority="
				+ priority + ", reminder=" + reminder + "]";
	}
	
	 
	 
	
	 
}
