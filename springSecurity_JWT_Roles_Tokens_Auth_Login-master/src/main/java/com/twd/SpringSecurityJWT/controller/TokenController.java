package com.twd.SpringSecurityJWT.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.twd.SpringSecurityJWT.util.SecurityUtil;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/token")
public class TokenController {

	
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "getToken", method = RequestMethod.POST)
	public @ResponseBody String getToken(HttpServletRequest request) {

		String tokenVal = new SecurityUtil().sha1(new Date().toString());
		Map<String, String> csrfMap = null;
		if (request.getSession().getAttribute("csrfMap") != null) {
			csrfMap = (Map<String, String>) request.getSession().getAttribute("csrfMap");
		} else {
			csrfMap = new HashMap<String, String>();
		}
		csrfMap.put(request.getParameter("selTab").toString(), tokenVal);
		// LOGGER.info("inside Token Controller tokenVal"+tokenVal);
		request.getSession().setAttribute("csrfMap", csrfMap);
		// LOGGER.info("return value"+request.getParameter("selTab").toString() + "#" +
		// tokenVal);
		return request.getParameter("selTab").toString() + "#" + tokenVal;

	}
}
