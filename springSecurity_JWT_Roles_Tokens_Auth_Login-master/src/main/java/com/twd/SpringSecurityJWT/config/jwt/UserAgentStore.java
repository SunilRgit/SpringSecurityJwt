package com.twd.SpringSecurityJWT.config.jwt;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public class UserAgentStore {

	private Map<String, String> userAgentMap = new HashMap<>();

	public void addUserAgent(String username, String userAgent) {
		userAgentMap.put(username, userAgent);
	}

	public String getUserAgent(String username) {
		return userAgentMap.get(username);
	}

	public void removeUserAgent(String username) {
		userAgentMap.remove(username);
	}
}
