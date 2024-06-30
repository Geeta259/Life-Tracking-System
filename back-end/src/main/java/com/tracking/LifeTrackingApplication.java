package com.tracking;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;
//import java.security.Key;
//import java.util.Base64;

//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.security.Keys;

@SpringBootApplication
public class LifeTrackingApplication  //implements  CommandLineRunner
{

	//@Autowired
	//private PasswordEncoder passwordEncoder;
	
	public static void main(String[] args) {
		SpringApplication.run(LifeTrackingApplication.class, args);
	}
/*
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		System.out.println(this.passwordEncoder.encode("Aa@123a"));
		
		// Generate a secure key for HS512 algorithm
        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        
        // Encode the key using Base64 encoding
        String encodedKey = Base64.getEncoder().encodeToString(key.getEncoded());
        
        System.out.println("Encoded Key: " + encodedKey);
	}
*/
}
