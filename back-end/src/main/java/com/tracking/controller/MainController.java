package com.tracking.controller;

import java.io.IOException;
import java.io.InputStream;
import java.security.Principal;
import java.sql.Date;
import java.time.LocalDate;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tracking.dao.AttendanceRepository;
import com.tracking.dao.ExerciseRepository;
import com.tracking.dao.ExpenseRepository;
import com.tracking.dao.GoalRepository;
import com.tracking.dao.IncomeRepository;
import com.tracking.dao.NoteRepository;
import com.tracking.dao.TaskRepository;
import com.tracking.dao.UserRepository;
import com.tracking.entities.Attendance;
import com.tracking.entities.Exercise;
import com.tracking.entities.Expenses;
import com.tracking.entities.Goal;
import com.tracking.entities.Income;
import com.tracking.entities.LoginData;
import com.tracking.entities.Notes;
import com.tracking.entities.Task;
import com.tracking.entities.User;
import com.tracking.service.FileService;

import jakarta.servlet.http.HttpServletResponse;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MainController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private FileService fileService;
	
	@Autowired
	private GoalRepository goalRepository;
	
	@Autowired
	private TaskRepository taskRepository;
	
	@Autowired
	private ExpenseRepository expenseRepository;
	
	@Autowired
	private IncomeRepository incomeRepository;
	
	@Autowired
	private ExerciseRepository exerciseRepository;
	

	@Autowired
	private AttendanceRepository attendanceRepository;
	
	@Autowired
	private NoteRepository noteRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCrypt;
	
	@Value("${project.image}")
	private  String path;
	
	
	@PostMapping("/adduser")
	public ResponseEntity<HttpStatus> addUser(@RequestBody User user)
	{	
		try {
			user.setRole("ROLE_ADMIN");
			this.userRepository.save(user);
			return new ResponseEntity<>(HttpStatus.OK);
		}catch(Exception e)
		{
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	    
	    @GetMapping("/profile/{email}")
		public User getProfile(@PathVariable String email)
		{
	    	User  user =  this.userRepository.findByEmail(email);
	    	System.out.println(user);
			return user;
		}
	    

	   

	    @PutMapping("/updateUser")
	    public ResponseEntity<User> updateUser(
	            @RequestParam("name") String name,
	            @RequestParam("email") String email,
	            @RequestParam("city") String city,
	            @RequestParam("state") String state,
	            @RequestParam("contactNo") String contactNo,
	            @RequestParam("dob") String dob,
	            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage) {

	        User user = userRepository.findByEmail(email);
	        user.setName(name);
	        user.setCity(city);
	        user.setState(state);
	        user.setContactNo(contactNo);
	        user.setDob(String.valueOf(Date.valueOf(dob)));
	        System.out.println("files name is  " + profileImage);
	        
	        if (profileImage != null && !profileImage.isEmpty()) {
	        	try
	        	{
	        		
	        		String s =  this.fileService.uploadImage(path, profileImage);
	   	         	user.setProfile(s);
	   	         	System.out.println("file uploaded...");
	        	}catch(IOException  e)
	        	{
	        		System.out.println("file not  uploaded..");
	        		e.printStackTrace();
	        	}
	         
	        }
	        userRepository.save(user);
	        return ResponseEntity.ok(user);
	    }
	    
	    
	    //gettting  file image data
	    @GetMapping("image/{imgname}")
	    public void showImage(@PathVariable("imgname") String imgname,HttpServletResponse response) throws IOException {
	    	InputStream resource = this.fileService.getResource(path, imgname);
	    	response.setContentType(MediaType.IMAGE_JPEG_VALUE);
	    	StreamUtils.copy(resource,response.getOutputStream());
	    }
	    
	    //add a goal data
	    @PostMapping("/add-goal")
	    public ResponseEntity<String> addGoal(@RequestBody Goal goal)
	    {
	    	LocalDate currentDate = LocalDate.now();
	    	String formattedDate = currentDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
	    	goal.setCurrdate(formattedDate);
	    	this.goalRepository.save(goal);
	    	 return ResponseEntity.ok("Goal added successfully!");
	    }
	    
	    @GetMapping("/show-goals/{email}")
		public List<Goal> getGoals(@PathVariable String email)
		{
			return this.goalRepository.findByEmail(email);
		}
	    @GetMapping("/get-goal/{id}")
		public Goal getGoalById(@PathVariable int id)
		{
			return this.goalRepository.findById(id);
		}
	    
	    @PutMapping("/update-goal/{id}")
	    public ResponseEntity<HttpStatus> updateGoal(@RequestBody Goal goal,@PathVariable int id)
	    {
	    	try {
	    		Goal oldgoal = this.goalRepository.findById(id);
		    	oldgoal.setCategory(goal.getCategory());
		    	oldgoal.setGoal(goal.getGoal());
		    	oldgoal.setDescription(goal.getDescription());
		    	oldgoal.setDeadline(goal.getDeadline());
		    	oldgoal.setPriority(goal.getPriority());
		    	oldgoal.setReminder(goal.getReminder());
		    	
		    	this.goalRepository.save(oldgoal);
	    		return new ResponseEntity<>(HttpStatus.OK);
	    	}catch(Exception  e)
	    	{
	    		e.printStackTrace();
	    		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        } 
	    }
	    
	    @DeleteMapping("/delete-goal/{id}")
		public ResponseEntity<HttpStatus> deleteGoal(@PathVariable int id)
		{
			try {
				this.goalRepository.deleteById(id);
				this.taskRepository.deleteByGoalId(id);
				
				return new ResponseEntity<>(HttpStatus.OK);
			}catch(Exception e)
			{
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	    
	    @PostMapping("/add-task")
	    public ResponseEntity<String> addTask(@RequestBody Task task)
	    {
	    		//Goal goal = this.goalRepository.findById(task.getGoalId());
	    		//task.setGoal(goal.getGoal());
	    		task.setStatus("Pending");
	    		Goal goal = this.goalRepository.findById(task.getGoalId());
	    		task.setCategory(goal.getCategory());
	    		
	    		LocalDate currentDate = LocalDate.now();
		    	String formattedDate = currentDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		    	task.setCurrdate(formattedDate);
		    
	    		this.taskRepository.save(task);
	    	
	    	 return ResponseEntity.ok("Task added successfully!");
	    }
	    
	    @GetMapping("/show-tasks/{goalid}")
		public List<Task> getGoals(@PathVariable("goalid") int goalid)
		{
			return this.taskRepository.findByGoalId(goalid);
		}
	    
	    @GetMapping("/get-task/{id}")
			public Task getTaskById(@PathVariable int id)
			{
				return this.taskRepository.findById(id);
			}
	    
	    @PutMapping("/update-task/{id}")
	    public ResponseEntity<HttpStatus> updateTask(@RequestBody Task task,@PathVariable int id)
	    {
	    	try {
	    		Task oldtask = this.taskRepository.findById(id);
	    		oldtask.setTask(task.getTask());
	    		oldtask.setStatus(task.getStatus());
	    		oldtask.setPriority(task.getPriority());
	    		oldtask.setDeadline(task.getDeadline());
	    		
	    		this.taskRepository.save(oldtask);
	    		
	    		return new ResponseEntity<>(HttpStatus.OK);
	    	}catch(Exception  e)
	    	{
	    		e.printStackTrace();
	    		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        } 
	    }
	    
	    @PutMapping("task-time/{taskId}/{elapsedTime}")
	    public ResponseEntity<HttpStatus> updateTaskTime(@PathVariable int taskId,@PathVariable String elapsedTime)
	    {
	    	try {
	    		Task oldtask = this.taskRepository.findById(taskId);
	    		oldtask.setTime(elapsedTime);
	    		//System.out.println(elapsedTime);
	    		this.taskRepository.save(oldtask);
	    		
	    		return new ResponseEntity<>(HttpStatus.OK);
	    	}catch(Exception  e)
	    	{
	    		e.printStackTrace();
	    		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        } 
	    }
	    
	    @DeleteMapping("/delete-task/{id}")
		public ResponseEntity<HttpStatus> deleteTask(@PathVariable int id)
		{
			try {
				this.taskRepository.deleteById(id);
				return new ResponseEntity<>(HttpStatus.OK);
			}catch(Exception e)
			{
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	    
	    @GetMapping("/get-tasks/{email}")
		public List<Task> getTasks(@PathVariable String email)
		{
			List<Goal> goals = this.goalRepository.findByEmail(email);
			List<Task> tasks = new ArrayList<>();
			for(Goal goal : goals)
			{
				List<Task> t = this.taskRepository.findByGoalId(goal.getId());
				tasks.addAll(t);			
			}
			
			return tasks;
		}
	    
	    
	   

	    @PutMapping("/change-pass")
	    public ResponseEntity<String> changePassword(@RequestBody Map<String, String> requestData) {
	    	
	        String email = requestData.get("email");
	        String oldPassword = requestData.get("oldPassword");
	        String newPassword = requestData.get("newPassword");
	     
	        try {
	            // Retrieve user by email
	            User user = this.userRepository.findByEmail(email);
	            
	            // Check if old password matches
	            if (bCrypt.matches(oldPassword, user.getPassword())) {
	                // Update password and save user
	                user.setPassword(bCrypt.encode(newPassword));
	                this.userRepository.save(user);
	                
	                // Return success response
	                return ResponseEntity.ok("Password changed successfully..!!");
	            } else {
	                // Old password doesn't match
	                return ResponseEntity.badRequest().body("Incorrect old password..!!");
	            }
	        } catch (Exception e) {
	            e.printStackTrace();
	            // Handle other exceptions
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to change password..!!");
	        }
	    	
	    }

	    @PostMapping("/add-expense")
	    public ResponseEntity<String> addExpense(@RequestBody Expenses expense)
	    {
	    	this.expenseRepository.save(expense);
	    	 return ResponseEntity.ok("Expense added successfully!");
	    }
	    
	    @GetMapping("/get-expenses/{email}")
		public List<Expenses> getExpenses(@PathVariable String email)
		{
			return this.expenseRepository.findByEmail(email);
		}
	    
	    @PutMapping("/update-expense/{id}")
	    public ResponseEntity<HttpStatus> updateExpense(@RequestBody Expenses expense,@PathVariable int id)
	    {
	    	try {
	    		Expenses oldexpense = this.expenseRepository.findById(id);
		    	oldexpense.setTitle(expense.getTitle());
		    	oldexpense.setDate(expense.getDate());
		    	oldexpense.setCategory(expense.getCategory());
		    	oldexpense.setAmount(expense.getAmount());
		    	
		    	this.expenseRepository.save(oldexpense);
	    		return new ResponseEntity<>(HttpStatus.OK);
	    	}catch(Exception  e)
	    	{
	    		e.printStackTrace();
	    		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        } 
	    }
	    
	    @DeleteMapping("/delete-expense/{id}")
	  		public ResponseEntity<HttpStatus> deleteExpense(@PathVariable int id)
	  		{
	  			try {
	  				this.expenseRepository.deleteById(id);
	  				
	  				return new ResponseEntity<>(HttpStatus.OK);
	  			}catch(Exception e)
	  			{
	  				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	  			}
	  		}
	    
	    
	    @PostMapping("/add-income")
	    public ResponseEntity<String> addIncome(@RequestBody Income income)
	    {
	    	this.incomeRepository.save(income);
	    	 return ResponseEntity.ok("Income  added successfully!");
	    }
		
	    @GetMapping("/get-incomes/{email}")
		public List<Income> getIncomes(@PathVariable String email)
		{
			return this.incomeRepository.findByEmail(email);
		}
	    
	    @PutMapping("/update-income/{id}")
	    public ResponseEntity<HttpStatus> updateIncome(@RequestBody Income income,@PathVariable int id)
	    {
	    	try {
	    		Income oldincome = this.incomeRepository.findById(id);
	    		oldincome.setTitle(income.getTitle());
		    	oldincome.setDate(income.getDate());
		    	oldincome.setAmount(income.getAmount());
		    	
		    	this.incomeRepository.save(oldincome);
	    		return new ResponseEntity<>(HttpStatus.OK);
	    	}catch(Exception  e)
	    	{
	    		e.printStackTrace();
	    		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        } 
	    }
	    
	    @DeleteMapping("/delete-income/{id}")
	  		public ResponseEntity<HttpStatus> deleteIncome(@PathVariable int id)
	  		{
	  			try {
	  				this.incomeRepository.deleteById(id);
	  				
	  				return new ResponseEntity<>(HttpStatus.OK);
	  			}catch(Exception e)
	  			{
	  				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	  			}
	  		}
	    
	    @PostMapping("/add-exercise")
	    public ResponseEntity<String> addExercise(@RequestBody Exercise exercise)
	    {
	    	LocalDate currentDate = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            String formattedDate = currentDate.format(formatter);

            // Set formatted date to the exercise object
            exercise.setPostedDate(formattedDate);
            
	    	this.exerciseRepository.save(exercise);
	    	 return ResponseEntity.ok("Exercise  added successfully!");
	    }
	    

	    @GetMapping("/get-exercise/{email}")
		public List<Exercise> getExercise(@PathVariable String email)
		{
			return this.exerciseRepository.findByEmail(email);
		}
	    
	    @PutMapping("/update-exercise/{id}")
	    public ResponseEntity<HttpStatus> updateExercise(@RequestBody Exercise exercise,@PathVariable int id)
	    {
	    	try {
	    		
	    		Exercise oldexe = this.exerciseRepository.findById(id);
		    	oldexe.setCategory(exercise.getCategory());
		    	oldexe.setDuration(exercise.getDuration());
		    	oldexe.setName(exercise.getName());
		    	oldexe.setReps(exercise.getReps());
		    	oldexe.setSets(exercise.getSets());
		    	oldexe.setWeight(exercise.getWeight());
		    	this.exerciseRepository.save(oldexe);
		    	
	    		return new ResponseEntity<>(HttpStatus.OK);
	    	}catch(Exception  e)
	    	{
	    		e.printStackTrace();
	    		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        } 
	    }
	    
	    @DeleteMapping("/delete-exercise/{id}")
  		public ResponseEntity<HttpStatus> deleteExercise(@PathVariable int id)
  		{
  			try {
  				this.exerciseRepository.deleteById(id);
  				
  				return new ResponseEntity<>(HttpStatus.OK);
  			}catch(Exception e)
  			{
  				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
  			}
  		}
	    
	    
	    //attendance tracking
	    @GetMapping("/get-attendance-data")
	    public List<Attendance> getAttendance() {
	        return this.attendanceRepository.findAll();
	    }
	    
	    @GetMapping("/get-attendance")
	    public List<Attendance> getAttendanceByMonth(
	            @RequestParam Integer month) {
	        return this.attendanceRepository.findByMonth(month);
	    }

	    @PostMapping("/add-attendance")
	    public Attendance saveAttendance(@RequestBody Attendance attendance) {
	    	//System.out.println(attendance);
	    	int year = Year.now().getValue();
	    	attendance.setYear(year);
	        return this.attendanceRepository.save(attendance);
	    }
	    
	    @DeleteMapping("/delete-attendance")
  		public ResponseEntity<HttpStatus> deleteAttendance(@RequestBody Attendance attendance)
  		{
  			try {
  			//	System.out.println(attendance);
  				this.attendanceRepository.deleteByMonthAndDay(attendance.getMonth(),attendance.getDay());
  				
  				return new ResponseEntity<>(HttpStatus.OK);
  			}catch(Exception e)
  			{
  				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
  			}
  		}
	    
	    
	    @DeleteMapping("/remove-old-attendance")
  		public ResponseEntity<HttpStatus> deleteOldAttendance()
  		{
  			try {
  			//	System.out.println(attendance);
  				int year = Year.now().getValue();
  				this.attendanceRepository.deleteOldYear(year);
  				
  				return new ResponseEntity<>(HttpStatus.OK);
  			}catch(Exception e)
  			{
  				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
  			}
  		}
	    
	    //note making
	    @PostMapping("/add-note")
	    public ResponseEntity<String> addNote(@RequestBody Notes note)
	    {
	    	LocalDate currentDate = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            String formattedDate = currentDate.format(formatter);

            // Set formatted date to the exercise object
            note.setDate(formattedDate);
            
	    	this.noteRepository.save(note);
	    	 return ResponseEntity.ok("Note added successfully!");
	    }
	    

	    @GetMapping("/get-notes/{email}")
		public List<Notes> getNotes(@PathVariable String email)
		{
			return this.noteRepository.findByEmail(email);
		}
	    
	    @PutMapping("/update-note/{id}")
	    public ResponseEntity<HttpStatus> updateNote(@RequestBody Notes note,@PathVariable int id)
	    {
	    	try {
	    		
	    		Notes  oldnote = this.noteRepository.findById(id);
		    	oldnote.setNotes(note.getNotes());
		    	this.noteRepository.save(oldnote);
		    	
	    		return new ResponseEntity<>(HttpStatus.OK);
	    	}catch(Exception  e)
	    	{
	    		e.printStackTrace();
	    		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        } 
	    }
	    
	    @DeleteMapping("/delete-note/{id}")
  		public ResponseEntity<HttpStatus> deleteNote(@PathVariable int id)
  		{
  			try {
  				this.noteRepository.deleteById(id);
  				
  				return new ResponseEntity<>(HttpStatus.OK);
  			}catch(Exception e)
  			{
  				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
  			}
  		}
}
