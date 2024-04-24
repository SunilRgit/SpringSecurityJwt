package com.twd.SpringSecurityJWT.service;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.twd.SpringSecurityJWT.bean.CustomUserDetails;
import com.twd.SpringSecurityJWT.config.jwt.ExpiringHashMap;
import com.twd.SpringSecurityJWT.config.jwt.UserAgentStore;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JWTUtils {

	@Autowired
	private UserAgentStore userAgentStore;

	@Autowired
	private HttpServletRequest request;

	private SecretKey Key;
	private final long ACCESS_TOKEN_VALIDITY = 1000 * 60 * 60 * 10; // 10 hours
	private final long REFRESH_TOKEN_VALIDITY = 1000 * 60 * 60 * 24 * 7; // 7 days

	private final ExpiringHashMap<String, Boolean> blacklistedTokens = new ExpiringHashMap<>();

	public JWTUtils() {
		String secreteString = "843567893696976453275974432697R634976R738467TR678T34865R6834R8763T478378637664538745673865783678548735687R3";
		byte[] keyBytes = Base64.getDecoder().decode(secreteString.getBytes(StandardCharsets.UTF_8));
		this.Key = new SecretKeySpec(keyBytes, "HmacSHA256");

		scheduleTokenCleanup();
	}

	public String generateToken(UserDetails userDetails) {
		String userAgent = request.getHeader("User-Agent");
		CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;
		Integer gnumUserId = customUserDetails.getGnumUserId();
		Integer userSeatId = customUserDetails.getGnumUserSeatId();
		return Jwts.builder().claim("userId", gnumUserId).claim("userSeatId", userSeatId).claim("userAgent", userAgent)
				.subject(userDetails.getUsername()).issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_VALIDITY)).signWith(Key).compact();
	}

	public String generateRefreshToken(HashMap<String, Object> claims, UserDetails userDetails) {
		return Jwts.builder().claims(claims).subject(userDetails.getUsername())
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_VALIDITY)).signWith(Key).compact();
	}

	public String extractUsername(String token) {
		return extractClaims(token, Claims::getSubject);
	}

	private <T> T extractClaims(String token, Function<Claims, T> claimsTFunction) {
		return claimsTFunction.apply(Jwts.parser().verifyWith(Key).build().parseSignedClaims(token).getPayload());
	}

	public boolean isTokenValid(String token, UserDetails userDetails) {
		final String username = extractUsername(token);
		final String userAgentFromToken = extractUserAgent(token);
		String userAgentFromStore = userAgentStore.getUserAgent(username);
		boolean expValue = isTokenExpired(token);

		// Check if the token is blacklisted
		boolean isBlacklisted = this.blacklistedTokens.containsKey(token);

		return (username.equals(userDetails.getUsername()) && !expValue && userAgentFromToken != null
				&& userAgentFromToken.equals(userAgentFromStore) && !isBlacklisted);
	}

	public boolean isTokenExpired(String token) {
		return extractClaims(token, Claims::getExpiration).before(new Date());
	}

	public Integer extractIntegerClaims(String token, String strClaim) {
		return extractClaims(token, claims -> (Integer) claims.get(strClaim));
	}

	public String extractUserAgent(String token) {
		return extractClaims(token, claims -> (String) claims.get("userAgent"));
	}

	public boolean isTokenBlacklisted(String token) {
		// Check if the token is blacklisted
		return blacklistedTokens.containsKey(token);
	}

	private void scheduleTokenCleanup() {
		// Schedule a task to clean up expired tokens every hour
		ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
		scheduler.scheduleAtFixedRate(() -> {
			blacklistedTokens.removeExpiredEntries();
		}, 0, 1, TimeUnit.HOURS); // Check for expired tokens every hour
	}

	public void addTokenInBlacklist(String token) {
		// TODO Auto-generated method stub
		blacklistedTokens.put(token, true, 1, TimeUnit.HOURS);
	}
}
