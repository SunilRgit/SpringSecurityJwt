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
public class GbltSuffixMstPK implements java.io.Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "gnum_suffix_code", nullable = false)
	private Integer gnumSuffixCode;

}
