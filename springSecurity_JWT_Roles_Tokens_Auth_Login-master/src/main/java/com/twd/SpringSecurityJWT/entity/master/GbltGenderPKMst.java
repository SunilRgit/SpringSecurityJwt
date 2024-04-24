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
public class GbltGenderPKMst {

	@Id
	@Column(name = "gstr_gender_code", length = 1, nullable = false)
	private String gstrGenderCode;
}
