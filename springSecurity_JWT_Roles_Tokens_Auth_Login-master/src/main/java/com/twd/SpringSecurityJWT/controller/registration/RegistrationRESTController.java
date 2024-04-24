package com.twd.SpringSecurityJWT.controller.registration;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.twd.SpringSecurityJWT.service.master.AppellationService;
import com.twd.SpringSecurityJWT.service.master.GenderService;
import com.twd.SpringSecurityJWT.service.master.SuffixService;
import com.twd.SpringSecurityJWT.util.ComboOption;
import com.twd.SpringSecurityJWT.util.GlobalUtil;

@RestController
@RequestMapping("/registrationRest")
public class RegistrationRESTController {

	@Autowired
	AppellationService appellationService;

	@Autowired
	SuffixService suffixService;

	@Autowired
	GenderService genderService;

	@Autowired
	private GlobalUtil globalUtil;

	@GetMapping("/getAppellations")
	@ResponseBody
	public String getAppellations() {
		String appellationCombo = globalUtil.getOptions(
				appellationService.getAppellationList().stream()
						.map(b -> new ComboOption(b.getGnumAppellationCode(),
								StringUtils.capitalize(b.getGstrAppellationName())))
						.collect(Collectors.toList()),
				"", new ComboOption("", "Select Value"));

		return appellationCombo;
	}

	@GetMapping("/getSuffix")
	@ResponseBody
	public String getSuffix() {
		String suffixCombo = globalUtil
				.getOptions(
						suffixService.getSuffixList().stream()
								.map(b -> new ComboOption(b.getGnumSuffixCode(),
										StringUtils.capitalize(b.getGstrSuffixName())))
								.collect(Collectors.toList()),
						"", new ComboOption("", "Select Value"));

		return suffixCombo;
	}

	@GetMapping("/getGender")
	@ResponseBody
	public String getGender() {
		String genderCombo = globalUtil
				.getOptions(
						genderService.getGenderList().stream()
								.map(b -> new ComboOption(b.getGstrGenderCode(),
										StringUtils.capitalize(b.getGstrGenderName())))
								.collect(Collectors.toList()),
						"", new ComboOption("", "Select Value"));

		return genderCombo;
	}

	@GetMapping("/getNationality")
	@ResponseBody
	public String getNationality() {
		String appellationCombo = globalUtil.getOptions(
				appellationService.getAppellationList().stream()
						.map(b -> new ComboOption(b.getGnumAppellationCode(),
								StringUtils.capitalize(b.getGstrAppellationName())))
						.collect(Collectors.toList()),
				"", new ComboOption("", "Select Value"));

		return appellationCombo;
	}
}
