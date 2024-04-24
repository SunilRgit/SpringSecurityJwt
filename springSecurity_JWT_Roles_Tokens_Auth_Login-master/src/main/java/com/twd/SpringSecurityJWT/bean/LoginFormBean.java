package com.twd.SpringSecurityJWT.bean;

import java.util.List;

import com.twd.SpringSecurityJWT.bean.master.MenuBean;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginFormBean extends GlobalBean {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String gstrUserName;
	private String gstrPassword;
	private Integer gnumUserId;
	private String loginSessionSalt;
	private String gstrIpNumber;
	private Integer gnumQuestionId;
	private String cid;
	private String varLanguage;
	private Integer gnumHospitalCode;
	private String jwtToken;

	protected String varCaptcha;
	private List<MenuBean> lstMenus = null;

}
