package com.twd.SpringSecurityJWT.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.twd.SpringSecurityJWT.bean.CustomUserDetails;
import com.twd.SpringSecurityJWT.bean.master.UserBean;
import com.twd.SpringSecurityJWT.repository.master.UserRepository;
import com.twd.SpringSecurityJWT.util.BeanUtils;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		UserBean userBean = BeanUtils.copyProperties(userRepository.findByGstrUserName(userName), UserBean.class);

		if (userBean == null) {
			throw new UsernameNotFoundException("User not Found !!");
		} else {
			return new CustomUserDetails(userBean);
		}
	}
}
