package com.tracking.security;

import com.tracking.dao.UserRepository;
import com.tracking.entities.User; // Import your custom User entity

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email); 
        
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        
        String password = user.getPassword(); // This should be the unencrypted password


        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")); // Basic implementation of GrantedAuthority
        return new org.springframework.security.core.userdetails.User(user.getEmail(), password, authorities); // Use fully qualified name for Spring Security User
 
    }
}
