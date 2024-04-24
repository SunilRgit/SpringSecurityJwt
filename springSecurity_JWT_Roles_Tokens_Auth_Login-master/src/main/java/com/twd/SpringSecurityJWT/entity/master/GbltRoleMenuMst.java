package com.twd.SpringSecurityJWT.entity.master;
// Generated 1 Oct, 2018 4:11:17 PM by Hibernate Tools 5.2.3.Final

import java.io.Serializable;
import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/**
 * UmmtUserMst generated by hbm2java
 */
@Getter
@Setter
@Entity
@Table(name = "gblt_role_menu_mst", schema = "ahiscl")
@IdClass(GbltRoleMenuPKMst.class)
public class GbltRoleMenuMst implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "gnum_module_id", nullable = false)
	private Integer gnumModuleId;

	@Id
	@Column(name = "gnum_role_id", nullable = false)
	private Integer gnumRoleId;

	@Id
	@Column(name = "gnum_menu_id", nullable = false)
	private Long gnumMenuId;

	@Id
	@Column(name = "gnum_role_menu_slno", nullable = false)
	private Integer gnumRoleMenuSlno;

	@Id
	@Column(name = "gnum_hospital_code", nullable = false)
	private Integer gnumHospitalCode;

	@Column(name = "gdt_effective_frm")
	private Timestamp gdtEffectiveFrm;

	@Column(name = "gdt_effective_to")
	private Timestamp gdtEffectiveTo;

	@Column(name = "gdt_entry_date")
	private Timestamp gdtEntryDate;

	@Column(name = "gnum_seatid")
	private Integer gnumSeatid;

	@Column(name = "gnum_isvalid")
	private Integer gnumIsvalid;

	@Column(name = "gnum_display_order")
	private Integer gnumDisplayOrder;

	@Column(name = "gnum_parent_id")
	private Long gnumParentId;

}