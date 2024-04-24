package com.twd.SpringSecurityJWT.bean;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserLogBean extends GlobalBean {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	// Successful Log
	private Integer gnumUserId;
	private String gdtLoginDate;
	private String varUserLoginTime;
	private String varUserLogoutDate;
	private String varUserLogoutTime;
	private Integer gnumHospitalCode;
	private Integer gnumSeatId;
	private String gstrIpNumber;
	private String varLoginStatus;

	// Unsuccessful Log
	private String gstrUserName;
	private String gdtEntryDate;
	private String gnumIsValid;

	private String varUnsuccessfulCount;
}
