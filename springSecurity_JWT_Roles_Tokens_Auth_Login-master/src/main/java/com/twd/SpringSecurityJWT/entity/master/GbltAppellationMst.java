package com.twd.SpringSecurityJWT.entity.master;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "gblt_appellation_mst", schema = "ahism")
@IdClass(GbltAppellationPKMst.class)
public class GbltAppellationMst implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "gnum_appellation_code")
	private Integer gnumAppellationCode;

	@Column(name = "gstr_appellation_name", length = 15)
	private String gstrAppellationName;

	@Column(name = "gnum_appellation_type")
	private Integer gnumAppellationType;

	@Column(name = "gnum_isvalid")
	private Integer gnumIsvalid;

	@Column(name = "gnum_seat_id")
	private Integer gnumSeatId;

	@Column(name = "gdt_entry", nullable = false)
	private Date gdtEntry;

	@Column(name = "gstr_remarks", length = 50)
	private String gstrRemarks;
}