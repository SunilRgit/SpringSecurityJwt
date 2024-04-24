package com.twd.SpringSecurityJWT.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.twd.SpringSecurityJWT.config.jwt.UserAgentStore;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class JWTTokenService {

	@Autowired
	private JWTUtils jwtUtils;

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private UserAgentStore userAgentStore;

	@Autowired
	private HttpServletResponse response;

	public void generateTokens(String username) {
		String userAgent = request.getHeader("User-Agent");
		// authenticationManager.authenticate(new
		// UsernamePasswordAuthenticationToken(username, password));
		final UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
		var jwt = jwtUtils.generateToken(userDetails);
		var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), userDetails);
		userAgentStore.addUserAgent(userDetails.getUsername(), userAgent);
		Map<String, String> tokens = new HashMap<>();
		tokens.put("accessToken", jwt);
		tokens.put("refreshToken", refreshToken);
		if (tokens != null)
			setTokensInCookies(tokens);
	}

	private void setTokensInCookies(Map<String, String> tokens) {
		// Add the access token to a cookie
		Cookie accessTokenCookie = new Cookie("accessToken", tokens.get("accessToken"));
		accessTokenCookie.setMaxAge(Integer.MAX_VALUE); // Set to expire after a long time
		response.addCookie(accessTokenCookie);

		// Add the refresh token to a cookie
		Cookie refreshTokenCookie = new Cookie("refreshToken", tokens.get("refreshToken"));
		refreshTokenCookie.setMaxAge(Integer.MAX_VALUE); // Set to expire after a long time
		response.addCookie(refreshTokenCookie);
	}

	public void invalidateTokenCookies(HttpServletRequest request, HttpServletResponse response) {
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals("accessToken") || cookie.getName().equals("refreshToken")) {
					cookie.setMaxAge(0); // Set the expiration time to 0 to invalidate the cookie
					cookie.setPath("/"); // Set the path to match the one used when creating the cookie
					response.addCookie(cookie); // Add the modified cookie to the response
					if (cookie.getName().equals("accessToken")) {
						jwtUtils.addTokenInBlacklist(cookie.getValue());
					}

				}
			}
		}
	}

	public Map<String, String> getTokensFromCookies(HttpServletRequest request) {
		Map<String, String> tokens = new HashMap<>();
		String accessToken = null;
		String refreshToken = null;
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals("accessToken")) {
					accessToken = cookie.getValue();
				}
				if (cookie.getName().equals("refreshToken")) {
					refreshToken = cookie.getValue();
				}
			}
		}
		tokens.put("accessToken", accessToken);
		tokens.put("refreshToken", refreshToken);
		return tokens;
	}

	public boolean validateToken(String accessToken, String refreshToken) {
		// TODO Auto-generated method stub
		String username = null;

		try {
			if (accessToken != null && !accessToken.equals("null")) {
				username = jwtUtils.extractUsername(accessToken);
			}

			UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
			return jwtUtils.isTokenValid(accessToken, userDetails);
		} catch (ExpiredJwtException e) {
			// Handle expired token
			System.out.println("Access token has expired");

			// Check if refresh token is provided and not expired
			if (refreshToken != null && !refreshToken.equals("null")) {
				System.out.println("Access token has expired inside refresh");
				try {
					// Retrieve username from refresh token and generate new tokens
					username = jwtUtils.extractUsername(refreshToken);
					UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
					if (jwtUtils.isTokenValid(refreshToken, userDetails)) {
						generateTokens(username);
						return true;
					}
				} catch (Exception ex) {
					ex.printStackTrace();
				}
			}

		} catch (Exception e) {
			log.error(e.getMessage());
			// e.printStackTrace();
			// Check if refresh token is provided and not expired
			invalidateTokenCookies(request, response);

		}
		return false;
	}

	public Integer extractIntegerClaims(String token, String strClaim) {
		return jwtUtils.extractIntegerClaims(token, strClaim);
	}

	public void removeUserAgent(String username) {
		userAgentStore.removeUserAgent(username);

	}

}
