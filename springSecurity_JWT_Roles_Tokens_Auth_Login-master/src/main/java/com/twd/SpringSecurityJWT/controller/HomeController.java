package com.twd.SpringSecurityJWT.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.twd.SpringSecurityJWT.bean.LoginFormBean;
import com.twd.SpringSecurityJWT.bean.UserDeskBean;
import com.twd.SpringSecurityJWT.bean.master.MenuBean;
import com.twd.SpringSecurityJWT.config.IMCSConfig;
import com.twd.SpringSecurityJWT.hlp.MenuHLP;
import com.twd.SpringSecurityJWT.security.SecureHashAlgorithm;
import com.twd.SpringSecurityJWT.service.JWTTokenService;
import com.twd.SpringSecurityJWT.service.LoginService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/auth")
public class HomeController {

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private LoginService loginService;

	@Autowired
	private JWTTokenService jwtTokenService;

	@Autowired
	private MenuHLP menuHLP;

	@Autowired
	private HttpServletResponse response;


	@GetMapping("/home")
	private String home(@ModelAttribute("loginFormBean") LoginFormBean loginFormBean, Model model,
			String errorMessage) {
		HttpSession session = request.getSession();
		String randomSessionSalt = SecureHashAlgorithm.getRandomSalt(IMCSConfig.LOGIN_SESSION_SALT_BYTE_SIZE);
		session.setAttribute("loginSessionSalt", randomSessionSalt);
		model.addAttribute("msg", errorMessage);
		return "home"; // Return the appropriate page
	}

	@SuppressWarnings("unchecked")
	@RequestMapping("/login")
	public String login(@ModelAttribute("loginFormBean") LoginFormBean loginFormBean, Model model,
			HttpServletRequest request) {
		try {
			String username = loginFormBean.getGstrUserName();
			String password = loginFormBean.getGstrPassword();
			HttpSession session = request.getSession();
			String captcha = (String) session.getAttribute("captcha");
			String loginSessionSalt = (String) session.getAttribute("loginSessionSalt");

			// validate Token
			Map<String, String> tokens = jwtTokenService.getTokensFromCookies(request);
			String accessToken = tokens.get("accessToken");
			String refreshToken = tokens.get("refreshToken");

			// If both access token and refresh token exist, validate the access token
			if (accessToken != null && refreshToken != null) {
				if (jwtTokenService.validateToken(accessToken, refreshToken)) {

					// validate Token
					tokens = jwtTokenService.getTokensFromCookies(request);
					accessToken = tokens.get("accessToken");
					refreshToken = tokens.get("refreshToken");
					// Access token is valid, return to the desk
					log.info("User already logged in with valid token: " + username);
					Integer userId = jwtTokenService.extractIntegerClaims(accessToken, "userId");
					UserDeskBean userDeskBean = new UserDeskBean();
					session.setAttribute("userMenus", (List<MenuBean>) session.getAttribute("userMenus"));
					model.addAttribute("username", username);
					model.addAttribute("userId", userId);
					model.addAttribute("jwtToken", accessToken);
					return desk(userDeskBean, model);
				}
			}

			if (validateUserCredentials(username, password) && validateCaptcha(loginFormBean, captcha)
					&& validateLoginSessionSalt(loginFormBean, loginSessionSalt)) {
				if (performUserLogin(loginFormBean)) {
					log.info("User logged in successfully: " + username);
					UserDeskBean userDeskBean = new UserDeskBean();
					session.setAttribute("userMenus", loginFormBean.getLstMenus());
					jwtTokenService.generateTokens(username);
					// validate Token
					tokens = jwtTokenService.getTokensFromCookies(request);
					accessToken = tokens.get("accessToken");
					refreshToken = tokens.get("refreshToken");
					model.addAttribute("username", loginFormBean.getGstrUserName());
					model.addAttribute("userId", loginFormBean.getGnumUserId());
					model.addAttribute("jwtToken", accessToken);
					return desk(userDeskBean, model);
				} else {
					log.warn("Login failed for user: " + username);
					return home(loginFormBean, model, "User Name Or Password does not match!!");
				}

			} else {
				return handleInvalidLogin(loginFormBean, model);
			}

		} catch (

		Exception e) {
			log.error("An error occurred during login: " + e.getMessage());
			e.printStackTrace();
		}

		return "home";
	}

	private boolean validateUserCredentials(String username, String password) {
		return username != null && !username.isEmpty() && password != null && !password.isEmpty();
	}

	private boolean validateCaptcha(LoginFormBean loginFormBean, String captcha) {
		return loginFormBean.getVarCaptcha() != null && loginFormBean.getVarCaptcha().equals(captcha);
	}

	private boolean validateLoginSessionSalt(LoginFormBean loginFormBean, String loginSessionSalt) {
		return loginFormBean.getLoginSessionSalt() != null
				&& loginFormBean.getLoginSessionSalt().equals(loginSessionSalt);
	}

	private boolean performUserLogin(LoginFormBean loginFormBean) {
		try {
			return loginService.loginUser(loginFormBean);
		} catch (Exception e) {
			log.error(e.getMessage());
			e.printStackTrace();
		}
		return false;
	}

	private String handleInvalidLogin(LoginFormBean loginFormBean, Model model) {
		String errorMessage = "";
		if (loginFormBean == null) {
			errorMessage = "Invalid login form data!";
		} else if (loginFormBean.getVarCaptcha() == null || loginFormBean.getLoginSessionSalt() == null) {
			errorMessage = "";
		} else if (loginFormBean.getVarCaptcha().isEmpty() || loginFormBean.getLoginSessionSalt().isEmpty()) {
			errorMessage = "Captcha or session salt cannot be empty!";
		}
		return home(loginFormBean, model, errorMessage);
	}

	@GetMapping("/desk")
	private String desk(UserDeskBean userDeskBean, Model model) {
		HttpSession session = request.getSession();
		@SuppressWarnings("unchecked")
		List<MenuBean> userMenus = (List<MenuBean>) session.getAttribute("userMenus");
		model.addAttribute("menuHLP", menuHLP.getMenuHLP(userMenus));
		return "desk";
	}

	@RequestMapping("/logout")
	public String logout(@ModelAttribute UserDeskBean userDeskBean, Model model) {
		request.getSession().invalidate();
		if (loginService.logoutUser(userDeskBean, request)) {
			jwtTokenService.invalidateTokenCookies(request, response);
			log.info("User logged out: " + userDeskBean.getGstrUserName());
		}
		return "redirect:/auth/home"; // Added return statement
	}
}
