package org.esco.demo.ssc.security;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.authentication.AuthenticationDetailsSource;
import org.springframework.security.web.authentication.WebAuthenticationDetails;

public class RememberWebAuthenticationDetailsSource implements
		AuthenticationDetailsSource<HttpServletRequest, WebAuthenticationDetails> {

	public WebAuthenticationDetails buildDetails(HttpServletRequest request) {
		return new RememberWebAuthenticationDetails(request);
	}
}
