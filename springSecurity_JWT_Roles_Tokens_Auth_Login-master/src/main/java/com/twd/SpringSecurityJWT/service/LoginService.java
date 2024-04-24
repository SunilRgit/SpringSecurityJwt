package com.twd.SpringSecurityJWT.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.twd.SpringSecurityJWT.bean.LoginFormBean;
import com.twd.SpringSecurityJWT.bean.UserDeskBean;
import com.twd.SpringSecurityJWT.bean.UserLogBean;
import com.twd.SpringSecurityJWT.bean.master.MenuBean;
import com.twd.SpringSecurityJWT.bean.master.UserBean;
import com.twd.SpringSecurityJWT.config.IMCSConfig;
import com.twd.SpringSecurityJWT.entity.GbltLoginUnsucessfulLog;
import com.twd.SpringSecurityJWT.entity.GbltUserLog;
import com.twd.SpringSecurityJWT.entity.master.GbltMenuMst;
import com.twd.SpringSecurityJWT.entity.master.GbltSeatRoleMst;
import com.twd.SpringSecurityJWT.entity.master.GbltUserMst;
import com.twd.SpringSecurityJWT.repository.LoginUnsuccessfulLogRepository;
import com.twd.SpringSecurityJWT.repository.UserLogRepository;
import com.twd.SpringSecurityJWT.repository.master.MenuRepository;
import com.twd.SpringSecurityJWT.repository.master.SeatRoleRepository;
import com.twd.SpringSecurityJWT.repository.master.UserRepository;
import com.twd.SpringSecurityJWT.security.SecureHashAlgorithm;
import com.twd.SpringSecurityJWT.service.master.MenuService;
import com.twd.SpringSecurityJWT.util.BeanUtils;
import com.twd.SpringSecurityJWT.util.DateHelperMethods;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class LoginService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private LoginUnsuccessfulLogRepository loginUnsuccessfulLogRepository;

	@Autowired
	private UserLogRepository userLogRepository;

	@Autowired
	private MenuRepository menuRepository;

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private SeatRoleRepository seatRoleRepository;

	@Autowired
	private MenuService menuService;

	@Autowired
	private JWTTokenService jwtTokenService;

	public boolean loginUser(LoginFormBean loginBean) throws Exception {
		UserBean objUserBean = null;
		boolean isValidUser = false;

		try {
			objUserBean = getUserDetails(loginBean);
			isValidUser = objUserBean.isLoggedIn();

			if (objUserBean == null || !objUserBean.isLoggedIn()) {
				// If userVO is null, means no valid user found against User Credentials.
				log.info(loginBean.getStrMessage());
				if (loginBean.getStrMessage() == null || loginBean.getStrMessage().isEmpty())
					loginBean.setStrMessage("Invalid User Name/Password!");
			} else {
				// If Valid user
				// call Menu Service to get Default Menu Details
				Long menuId = objUserBean.getGnumMenuId() != null ? Long.valueOf(objUserBean.getGnumMenuId()) : null;
				if (menuId != null) {
					GbltMenuMst objMenu = menuRepository.findByGnumMenuIdAndGnumIsValid(menuId, 1);
					if (objMenu != null) {
						objUserBean.setVarDefaultMenuName(objMenu.getGstMenuName());
						objUserBean.setVarDefaultMenuURL(objMenu.getGstrUrl());
					}
					// Use objMenu as needed
				}
				UserLogBean voUserLog = new UserLogBean();
				BeanUtils.copyProperties(objUserBean, voUserLog);
				voUserLog.setGnumSeatId(objUserBean.getGnumUserSeatId());
				voUserLog.setGstrIpNumber(request.getRemoteAddr());
				voUserLog.setGdtLoginDate(DateHelperMethods.getDateString(new Date()));
				objUserBean.setGstrIpNumber(voUserLog.getGstrIpNumber());

				List<MenuBean> lstMenus = logUserSuccessfulLogin(voUserLog);
				loginBean.setLstMenus(lstMenus);
				loginBean.setGnumUserId(objUserBean.getGnumUserId());

			}
		} catch (Exception e) {
			log.error("Error during login validation: {}", e.getMessage());
			throw e;
		}

		return isValidUser;
	}

	private UserBean getUserDetails(LoginFormBean loginBean) throws Exception {
		UserBean userBean = new UserBean();

		try {
			GbltUserMst userVO = userRepository.findByGstrUserName(loginBean.getGstrUserName());

			if (userVO == null) {
				userBean.setLoggedIn(false);
				userBean.setVarLoginMessage("Invalid User Name/Password!");
				return userBean;
			}

			boolean isUserLocked = userVO.getGnumIsLock() == 1;

			if (isUserLocked) {
				userBean.setLoggedIn(false);
				userBean.setVarLoginMessage("User is Locked. Contact System Administrator.");
				return userBean;
			}

			String hashedPassword = SecureHashAlgorithm
					.SHA1(userVO.getGstrPassword() + loginBean.getLoginSessionSalt());
			boolean isValidUser = loginBean.getGstrPassword().equals(hashedPassword);

			if (isValidUser) {
				userBean.populate(userVO);
				userBean.setVarLanguage(loginBean.getVarLanguage());
				userBean.setLoggedIn(true);
				userBean.setGstrUserName(loginBean.getGstrUserName());
				userBean.setGnumMenuId(String.valueOf(userVO.getGnumMenuId()));

				// Reset unsuccessful login
				loginUnsuccessfulLogRepository.markUserUnsuccessfulLogInvalid(loginBean.getGstrUserName());
			} else {
				logUnsuccessfulLogin(loginBean, isUserLocked);
			}

		} catch (Exception e) {
			log.error("Error in getUserDetails", e);
			throw e;
		}

		return userBean;
	}

	private void logUnsuccessfulLogin(LoginFormBean loginBean, boolean isUserLocked) {
		try {
			GbltLoginUnsucessfulLog loginLog = new GbltLoginUnsucessfulLog();
			loginLog.setGstrLoginid(loginBean.getGstrUserName());
			loginLog.setGdtEntryDate(new Date());
			loginLog.setGnumIsvalid(1);
			loginLog.setGstrIpNumber(loginBean.getGstrIpNumber());
			loginLog.setGnumLockStatus(isUserLocked ? 1 : 0);

			loginUnsuccessfulLogRepository.save(loginLog);

			if (!isUserLocked) {
				long unsuccessfulLoginCount = loginUnsuccessfulLogRepository
						.countValidByGstrLoginid(loginLog.getGstrLoginid());
				if (unsuccessfulLoginCount >= IMCSConfig.LOGIN_LOCK_AFTER_UNSUCCESSFUL_LOGIN_COUNT) {
					userRepository.lockUser(loginBean.getGstrUserName());
				}
			}
		} catch (Exception e) {
			log.error("Error logging unsuccessful login attempt", e);
		}
	}

	public boolean logUserSuccessfulLogout(UserLogBean voUserLoginLog) {
		try {
			// Log User Logout Detail
			GbltUserLog userLog = new GbltUserLog();
			userLog.setGnumUserid(voUserLoginLog.getGnumUserId());
			userLog.setGnumSeatId(voUserLoginLog.getGnumSeatId());
			userLog.setGdtLoguttDate(null);
			userLog.setGstrIpNumber(voUserLoginLog.getGstrIpNumber());
			userLog.setGnumHospitalCode(voUserLoginLog.getGnumHospitalCode());
			userLogRepository.updateLogoutTime(userLog.getGnumUserid(), userLog.getGnumSeatId(),
					userLog.getGstrIpNumber(), userLog.getGnumHospitalCode());
		} catch (Exception e) {
			log.error("Error in logUserSuccessfulLogout", e);
			throw e; // Re-throw the exception after logging
		} finally {
		}
		return true;
	}

	public List<MenuBean> logUserSuccessfulLogin(UserLogBean voUserLoginLog) throws Exception {
		List<MenuBean> lstMenus = null;
		try {
			// Log User Login Detail
			GbltUserLog userLog = new GbltUserLog();
			userLog.setGnumUserid(voUserLoginLog.getGnumUserId());
			userLog.setGnumSeatId(voUserLoginLog.getGnumSeatId());
			userLog.setGdtLoginDate(new Date());
			userLog.setGdtLoguttDate(null);
			userLog.setGstrIpNumber(voUserLoginLog.getGstrIpNumber());
			userLog.setGnumHospitalCode(voUserLoginLog.getGnumHospitalCode());
			userLogRepository.save(userLog);

			List<GbltSeatRoleMst> lstRoleId = seatRoleRepository.findGnumRoleIdByGblIsvalidAndGnumSeatid(1,
					Integer.valueOf(voUserLoginLog.getGnumSeatId()));

			lstMenus = menuService.getMenusMappedWithUser(lstRoleId);

			// Getting System Date Other
			String[] obj = new SimpleDateFormat("dd MMM yyyy HH mm ss").format(new Date()).split(" ");
			UserBean sysdateVO = new UserBean();
			if (obj != null && obj.length == 6) {
				sysdateVO.setVarCurrentDate(obj[0]);
				sysdateVO.setVarCurrentMonth(obj[1]);
				sysdateVO.setVarCurrentYear(obj[2]);
				sysdateVO.setVarCurrentHour(obj[3]);
				sysdateVO.setVarCurrentMinute(obj[4]);
				sysdateVO.setVarCurrentSecond(obj[5]);
			}

		} catch (Exception e) {
			log.error("Error in logUserSuccessfulLogin", e);
			throw e; // Re-throw the exception after logging
		}
		return lstMenus;
	}

	public boolean logoutUser(UserDeskBean userDeskBean, HttpServletRequest objRequest) {
		boolean flg = true;
		try {
			// validate Token
			GbltUserMst gbltUserMst = userRepository.findByGnumUserId(userDeskBean.getGnumUserId());
			// Updating Logout Status from DB
			UserLogBean voUserLog = new UserLogBean();
			voUserLog.setGnumUserId(gbltUserMst.getGnumUserId());
			voUserLog.setVarUserLogoutDate(DateHelperMethods.getDateString(System.currentTimeMillis()));
			voUserLog.setGnumSeatId(gbltUserMst.getGnumSeatId());
			voUserLog.setGnumHospitalCode(gbltUserMst.getGnumHospitalCode());
			voUserLog.setGstrIpNumber(request.getRemoteAddr());
			logUserSuccessfulLogout(voUserLog);
			jwtTokenService.removeUserAgent(gbltUserMst.getGstrUserName());

		} catch (Exception e) {
			log.error(e.getMessage());
			flg = false;
			e.printStackTrace();// Hide This for Production
		}
		return flg;
	}

}
