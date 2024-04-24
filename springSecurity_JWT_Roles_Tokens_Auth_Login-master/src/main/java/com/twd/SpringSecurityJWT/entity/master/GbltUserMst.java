package com.twd.SpringSecurityJWT.entity.master;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "gblt_user_mst", schema = "ahiscl")
@IdClass(GbltUserPKMst.class)
public class GbltUserMst implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@Column(name = "gnum_userid")
	private Integer gnumUserId;

	@Column(name = "gstr_user_name", nullable = false, length = 20)
	private String gstrUserName;

	@Column(name = "gstr_password", nullable = false, length = 100)
	private String gstrPassword;

	@Column(name = "gnum_hospital_code", nullable = false, precision = 6, scale = 0)
	private Integer gnumHospitalCode;

	@Column(name = "psrstr_emp_no", length = 14)
	private String psrStrEmployeeNumber;

	@Column(name = "gstr_old_password", length = 100)
	private String gstrOldPassword;

	@Column(name = "gnum_user_seatid")
	private Integer gnumUserSeatId;

	@Column(name = "gdt_effect_date", nullable = false)
	private Timestamp gdtEffectDate;

	@Column(name = "gdt_expiry_date")
	private Timestamp gdtExpiryDate;

	@Column(name = "gstr_status_code", nullable = false, length = 1)
	private String gstrStatusCode;

	@Column(name = "gnum_seat_id", nullable = false)
	private Integer gnumSeatId;

	@Column(name = "gdt_entry_date", nullable = false)
	private Timestamp gdtEntryDate;

	@Id
	@Column(name = "gnum_isvalid", nullable = false)
	private Integer gnumIsValid;

	@Column(name = "gnum_user_type_id")
	private Integer gnumUserTypeId;

	@Column(name = "gnum_user_type")
	private Integer gnumUserType;

	@Column(name = "gnum_userlevel")
	private Integer gnumUserLevel;

	@Column(name = "gstr_hint_answer", length = 100)
	private String gstrHintAnswer;

	@Column(name = "gstr_usr_name", length = 50)
	private String gstrUsrName;

	@Column(name = "gnum_designation", length = 50)
	private String gnumDesignation;

	@Column(name = "gnum_islock")
	private Integer gnumIsLock;

	@Column(name = "num_dist_id")
	private Integer numDistId;

	@Column(name = "gstr_email_id", length = 60)
	private String gstrEmailId;

	@Column(name = "gnum_mobile_number")
	private Long gnumMobileNumber;

	@Column(name = "gnum_question_id")
	private Integer gnumQuestionId;

	@Column(name = "gnum_swapcard_number", length = 50)
	private String gnumSwapcardNumber;

	@Column(name = "gdt_changepassword_date")
	private Timestamp gdtChangePasswordDate;

	@Column(name = "gdt_lstmod_date")
	private Timestamp gdtLstModDate;

	@Column(name = "gnum_lstmod_seatid")
	private Integer gnumLstModSeatId;

	@Column(name = "gnum_menu_id")
	private Long gnumMenuId;

	@Column(name = "gnum_autorefresh")
	private Integer gnumAutoRefresh;

	@Column(name = "gnum_existing_userid")
	private Integer gnumExistingUserId;

	@Column(name = "user_cat", nullable = false)
	private Integer userCat;

	@Column(name = "dategdt_entry_date")
	private Timestamp dateEntryDate;

	@Column(name = "gnum_mail_send")
	private Integer mailSend;

}
