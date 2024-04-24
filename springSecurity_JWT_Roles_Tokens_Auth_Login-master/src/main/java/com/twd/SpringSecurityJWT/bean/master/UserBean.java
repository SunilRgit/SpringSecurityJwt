package com.twd.SpringSecurityJWT.bean.master;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.twd.SpringSecurityJWT.bean.GlobalBean;
import com.twd.SpringSecurityJWT.entity.master.GbltUserMst;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserBean extends GlobalBean {

	private static final long serialVersionUID = 1L;
	private Integer gnumUserId;
	private String gdtChangePasswordDate;
	private String gdtEntryDate;
	private String gdtLstModDate;
	private String gnumDesignation;
	private String gnumIsLock;
	private String gnumIsValid;
	private String gnumLstModSeatId;
	private String gnumMobileNumber;
	private String gnumQuestionId;
	private String gnumSeatId;
	private Integer gnumUserSeatId;
	private String gnumUserType;
	private String gnumUserTypeId;
	private String gstrEmailId;
	private String gstrHintAnswer;
	private String gstrOldPassword;
	private String gstrPassword;
	private String gstrUserName;
	private String gstrUsrName;
	private String gnumHospitalCode;
	private String gnumMenuId;
	private String varLanguage;
	private boolean isLoggedIn;
	private String varLoginMessage;
	private String gstrIpNumber;
	private String varAddress;
	private String varDefaultMenuURL;
	private String varCurrentYear;
	private String varCurrentMonth;
	private String varCurrentDate;
	private String varCurrentHour;
	private String varCurrentMinute;
	private String varCurrentSecond;
	private String varDefaultMenuName;
	private String stateId;
	private String varConfirmPassword;
	private String strMessage;
	private String gnumUserLevel;
	private String psrStrEmployeeNumber;

	public void populate(GbltUserMst gbltUserMst) {
		this.gnumUserId = gbltUserMst.getGnumUserId();
		this.gnumHospitalCode = Integer.toString(gbltUserMst.getGnumHospitalCode());
		this.gdtChangePasswordDate = formatDate(gbltUserMst.getGdtChangePasswordDate());
		this.gdtEntryDate = formatDate(gbltUserMst.getGdtEntryDate());
		this.gdtLstModDate = formatDate(gbltUserMst.getGdtLstModDate());
		this.gnumDesignation = gbltUserMst.getGnumDesignation();
		this.gnumIsLock = String.valueOf(gbltUserMst.getGnumIsLock());
		this.gnumIsValid = String.valueOf(gbltUserMst.getGnumIsValid());
		this.gnumLstModSeatId = String.valueOf(gbltUserMst.getGdtLstModDate());
		this.gnumMenuId = "";
		this.gnumMobileNumber = String.valueOf(gbltUserMst.getGnumMobileNumber());

		this.gnumQuestionId = String.valueOf(gbltUserMst.getGnumQuestionId());
		this.gnumSeatId = String.valueOf(gbltUserMst.getGnumSeatId());
		this.gnumUserType = String.valueOf(gbltUserMst.getGnumUserTypeId());
		this.gnumUserTypeId = String.valueOf(gbltUserMst.getGnumUserTypeId());
		// this.varAddress= gbltUserMst.getGstrAddress();
		this.gstrEmailId = gbltUserMst.getGstrEmailId();
		this.gstrHintAnswer = gbltUserMst.getGstrHintAnswer();
		this.gstrOldPassword = gbltUserMst.getGstrOldPassword();
		this.gstrPassword = gbltUserMst.getGstrPassword();
		this.gstrUserName = gbltUserMst.getGstrUserName();
		this.gstrUsrName = gbltUserMst.getGstrUsrName();
		this.gnumUserLevel = String.valueOf(gbltUserMst.getGnumUserLevel());
		this.psrStrEmployeeNumber = gbltUserMst.getPsrStrEmployeeNumber();
		this.gnumUserSeatId= gbltUserMst.getGnumUserSeatId();

	}

	private String formatDate(Date date) {
		DateFormat df = new SimpleDateFormat("dd-MMM-yyyy");
		return date == null ? "" : df.format(date);
	}
}
