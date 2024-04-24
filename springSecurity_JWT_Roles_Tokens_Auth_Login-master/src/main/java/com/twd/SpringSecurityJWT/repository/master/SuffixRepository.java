package com.twd.SpringSecurityJWT.repository.master;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.twd.SpringSecurityJWT.entity.master.GbltSuffixMst;

@Repository
public interface SuffixRepository extends JpaRepository<GbltSuffixMst, Integer> {
	List<GbltSuffixMst> findByGnumIsValid(Integer gnumIsValid);

	String findGstrSuffixNameByGnumSuffixCodeAndGnumIsValid(Integer gnumSuffixCode, Integer gnumIsValid);
}
