package com.tracking.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Task")
public class Task {
	@Id
	 @GeneratedValue(strategy=GenerationType.AUTO)
	 private int id;
	private int goalId;
	 private String goal;
	 private String category;
	 private String task;
	 private String deadline;
	 private String currdate;
	 private String time;
	 private String priority;
	 private String status;
	 
	public Task() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Task(int id, int goalId, String goal, String task, String deadline,String currdate,String category, String time,String priority,String status) {
		super();
		this.id = id;
		this.goalId = goalId;
		this.goal = goal;
		this.task = task;
		this.category=category;
		this.deadline = deadline;
		this.currdate = currdate;
		this.time = time;
		this.priority = priority;
		this.status=status;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getGoalId() {
		return goalId;
	}
	public void setGoalId(int goalId) {
		this.goalId = goalId;
	}
	public String getGoal() {
		return goal;
	}
	public void setGoal(String goal) {
		this.goal = goal;
	}
	public String getTask() {
		return task;
	}
	public void setTask(String task) {
		this.task = task;
	}
	public String getDeadline() {
		return deadline;
	}
	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}
	public String getPriority() {
		return priority;
	}
	public void setPriority(String priority) {
		this.priority = priority;
	}
	
	public String getCurrdate() {
		return currdate;
	}
	public void setCurrdate(String currdate) {
		this.currdate = currdate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	@Override
	public String toString() {
		return "Task [id=" + id + ", goalId=" + goalId + ", goal=" + goal + ", category=" + category + ", task=" + task
				+ ", deadline=" + deadline + ", currdate=" + currdate + ", time=" + time + ", priority=" + priority
				+ ", status=" + status + "]";
	}
	 
}
