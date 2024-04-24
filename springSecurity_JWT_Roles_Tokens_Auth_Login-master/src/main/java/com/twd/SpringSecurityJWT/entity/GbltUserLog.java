package com.twd.SpringSecurityJWT.entity;

// Generated Jan 29, 2018 4:01:44 PM by Hibernate Tools 4.3.5.Final

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * GbltUserLogId generated by hbm2java
 */

@Getter
@Setter
@Data
@Entity
@Table(name = "gblt_user_log", schema = "ahiscl")
@IdClass(GbltUserLogPK.class)
public class GbltUserLog implements java.io.Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "gdt_login_date", nullable = false, length = 29)
	private Date gdtLoginDate;

	@Column(name = "gdt_logutt_date", length = 29)
	private Date gdtLoguttDate;

	@Id
	@Column(name = "gnum_hospital_code", nullable = false)
	private Integer gnumHospitalCode;

	@Id
	@Column(name = "gnum_seat_id", nullable = false)
	private Integer gnumSeatId;

	@Id
	@Column(name = "gnum_userid", nullable = false)
	private Integer gnumUserid;

	@Column(name = "gstr_ip_number", length = 15)
	private String gstrIpNumber;

}
