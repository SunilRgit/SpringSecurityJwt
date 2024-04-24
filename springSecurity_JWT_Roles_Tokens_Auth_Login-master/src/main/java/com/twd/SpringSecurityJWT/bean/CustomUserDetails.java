package com.twd.SpringSecurityJWT.bean;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.twd.SpringSecurityJWT.bean.master.UserBean;

public class CustomUserDetails implements UserDetails {

	private static final long serialVersionUID = 1L;
	private UserBean user;

	public CustomUserDetails(UserBean user) {
		this.user = user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// Return a fixed role for all users
		return Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));
	}

	@Override
	public String getPassword() {
		return user.getGstrPassword();
	}

	@Override
	public String getUsername() {
		return user.getGstrUserName();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public Integer getGnumUserId() {
		return user.getGnumUserId(); // Retrieve gnumUserId from UserBean
	}

	public Integer getGnumUserSeatId() {
		return user.getGnumUserSeatId();// Retrieve gnumUserId from UserBean
	}

}
