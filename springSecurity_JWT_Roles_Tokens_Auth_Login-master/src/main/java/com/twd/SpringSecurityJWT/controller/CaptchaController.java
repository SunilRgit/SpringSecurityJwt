package com.twd.SpringSecurityJWT.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.twd.SpringSecurityJWT.service.CaptchaService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/captcha")
public class CaptchaController {

	@Autowired
	private CaptchaService captchaService;

	@ResponseBody
	@GetMapping(value = "/getCaptcha")
	public void getCaptcha() throws IOException {
		captchaService.processRequest();
	}
}
