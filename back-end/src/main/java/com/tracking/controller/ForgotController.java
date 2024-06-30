package com.tracking.controller;

import java.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tracking.dao.UserRepository;
import com.tracking.entities.User;
import com.tracking.service.EmailServices;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/home")
public class ForgotController {
	
	 private final Random random = new Random();
		
		@Autowired
		private UserRepository userRepository;
		
		@Autowired
		private EmailServices emailServices;
		
		@Autowired
		private BCryptPasswordEncoder bcrypt;
		
		@PostMapping("/send-otp")
	    public ResponseEntity<Integer> sendOTP(@RequestParam("email") String email) {
	        User user = userRepository.findByEmail(email);
	        if (user == null) {
	            return new ResponseEntity<>(0, HttpStatus.NOT_FOUND);
	        }

	        int otp = 1000 + random.nextInt(9000);
	        String subject = "OTP From All In One Tracking System for password reset";
	        String message = "<div style='border:1px solid #e2e2e2; padding:20px'>"
	                + "<h1>"
	                + "OTP is "
	                + "<b>" + otp
	                + "</b>"
	                + "</h1>"
	                + "</div>";
	        boolean flag = this.emailServices.sendEmail(subject, message, email);
	        System.out.println(otp);
	        return flag ? new ResponseEntity<>(otp, HttpStatus.OK) : new ResponseEntity<>(0, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
		 			
			@PostMapping("/change-password")
			public ResponseEntity<HttpStatus> changePassword(@RequestParam("email") String email,@RequestParam("newpassword") String newpassword)
			{
				User user = this.userRepository.findByEmail(email);
				user.setPassword(this.bcrypt.encode(newpassword));
				this.userRepository.save(user);
				return new ResponseEntity<>(HttpStatus.OK);
			}
}
