package com.twd.SpringSecurityJWT.entity.master;
// Generated 1 Oct, 2018 4:11:17 PM by Hibernate Tools 5.2.3.Final

import java.io.Serializable;
import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Data;

/**
 * UmmtUserMst generated by hbm2java
 */
@Data
@Entity
@Table(name = "gblt_gender_mst", schema = "ahiscl")
@IdClass(GbltGenderPKMst.class)
public class GbltGenderMst implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "gstr_gender_code", length = 1, nullable = false)
	private String gstrGenderCode;

	@Column(name = "gstr_gender_name", length = 20, nullable = false)
	private String gstrGenderName;

	@Column(name = "gnum_seat_id", precision = 5, scale = 0)
	private Integer gnumSeatId;

	@Column(name = "gdt_entry_date", nullable = false)
	private Timestamp gdtEntryDate;

	@Column(name = "gnum_isvalid", precision = 1, nullable = false)
	private Integer gnumIsValid;

	@Column(name = "gnum_lstmod_seatid", precision = 5)
	private Integer gnumLastModifiedSeatId;

	@Column(name = "gdt_lstmod_date")
	private Timestamp gdtLastModifiedDate;

}
