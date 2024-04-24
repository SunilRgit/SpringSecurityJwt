package com.twd.SpringSecurityJWT.entity.master;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@EqualsAndHashCode
public class GbltRoleMenuPKMst implements java.io.Serializable {

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
}
