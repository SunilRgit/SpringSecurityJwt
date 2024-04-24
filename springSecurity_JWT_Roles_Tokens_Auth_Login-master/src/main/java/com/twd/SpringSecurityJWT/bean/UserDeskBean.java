package com.twd.SpringSecurityJWT.bean;

import java.util.List;

import com.twd.SpringSecurityJWT.bean.master.MenuBean;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDeskBean extends GlobalBean {

	private static final long serialVersionUID = 1L;
	protected String gstrUserName;
	protected String gstrUsrName;
	protected String gstrOldPassword;

	protected String varIsFirstTimeLogin;
	protected String varCurrentDate;
	protected String varDefaultMenuURL;
	protected String varDefaultMenuName;

	protected Integer gnumUserTypeId;
	private List<MenuBean> lstMenus = null;
	private Integer gnumUserId;

}
