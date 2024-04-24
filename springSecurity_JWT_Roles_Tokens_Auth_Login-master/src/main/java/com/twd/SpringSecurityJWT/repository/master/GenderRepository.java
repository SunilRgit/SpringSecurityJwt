package com.twd.SpringSecurityJWT.repository.master;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.twd.SpringSecurityJWT.entity.master.GbltGenderMst;

@Repository
public interface GenderRepository extends JpaRepository<GbltGenderMst, String> {
	List<GbltGenderMst> findByGnumIsValidOrderByGstrGenderName(Integer gnumIsValid);

	String findGstrGenderNameByGstrGenderCodeAndGnumIsValid(String gstrGenderCode, Integer gnumIsValid);
}
