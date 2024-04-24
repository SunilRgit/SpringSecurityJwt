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
@Table(name = "gblt_suffix_mst", schema = "ahiscl")
@IdClass(GbltSuffixMstPK.class)
public class GbltSuffixMst implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "gnum_suffix_code", nullable = false)
	private Integer gnumSuffixCode;

	@Column(name = "gstr_suffix_name", length = 15)
	private String gstrSuffixName;

	@Column(name = "gnum_isvalid")
	private Integer gnumIsValid;

	@Column(name = "gnum_seat_id")
	private Integer gnumSeatId;

	@Column(name = "gdt_entry_date")
	private Date gdtEntryDate;

	@Column(name = "gdt_lstmod_date")
	private Date gdtLstmodDate;

	@Column(name = "gnum_lstmod_seatid")
	private Integer gnumLstmodSeatid;

}