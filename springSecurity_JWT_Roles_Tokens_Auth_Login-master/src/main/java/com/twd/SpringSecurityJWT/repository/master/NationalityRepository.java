package com.twd.SpringSecurityJWT.repository.master;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.twd.SpringSecurityJWT.entity.master.GbltNationalityMst;

@Repository
public interface NationalityRepository extends JpaRepository<GbltNationalityMst, Integer> {
	// You can define custom query methods here if needed

	// Method to get all valid nationalities ordered by nationality code
	List<GbltNationalityMst> findByGnumIsValidOrderByGnumNationalityCode(Integer gnumIsValid);

	// Method to get the nationality name by nationality code
	String findGstrNationalityNameByGnumNationalityCodeAndGnumIsValid(Integer gnumNationalityCode, Integer gnumIsValid);
}
