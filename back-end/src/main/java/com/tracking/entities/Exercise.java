package com.tracking.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Exercise")
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String uemail;
    private String name;
    private String category;
    private double weight;
    private int duration;
    private int reps;
    private int sets;
    private String postedDate;

    public Exercise() {
    }

    public Exercise(String name,String uemail, String category,double weight, int duration, int reps, int sets, String postedDate) {
        this.name = name;
        this.uemail=uemail;
        this.category = category;
        this.weight = weight;
        this.duration = duration;
        this.reps = reps;
        this.sets = sets;
        this.postedDate = postedDate;
    }

    // Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUemail() {
		return uemail;
	}

	public void setUemail(String uemail) {
		this.uemail = uemail;
	}

	public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public int getReps() {
        return reps;
    }

    public void setReps(int reps) {
        this.reps = reps;
    }

    public int getSets() {
        return sets;
    }

    public void setSets(int sets) {
        this.sets = sets;
    }

    public String getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(String postedDate) {
        this.postedDate= postedDate;
    }

	@Override
	public String toString() {
		return "Exercise [id=" + id + ", uemail=" + uemail + ", name=" + name + ", category=" + category + ", weight="
				+ weight + ", duration=" + duration + ", reps=" + reps + ", sets=" + sets + ", postedDate=" + postedDate
				+ "]";
	}
}
