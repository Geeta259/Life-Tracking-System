package com.tracking.security;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.Serializable;

//second step 
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint, Serializable {

	//this method execute when unauthorized user want access  authorized api
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
    	
    	//return response error
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized !!! Access denied...");
    }
}
