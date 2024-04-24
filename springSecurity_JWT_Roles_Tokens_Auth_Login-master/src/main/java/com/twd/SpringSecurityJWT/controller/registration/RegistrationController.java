package com.twd.SpringSecurityJWT.controller.registration;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/registration")
public class RegistrationController {

	@GetMapping("/newRegistration")
	public String getEmployeeRegistration() {
		// Assuming "employeeRegistration" is the name of your HTML template
		return "registration/employeeRegistration";
	}
}
