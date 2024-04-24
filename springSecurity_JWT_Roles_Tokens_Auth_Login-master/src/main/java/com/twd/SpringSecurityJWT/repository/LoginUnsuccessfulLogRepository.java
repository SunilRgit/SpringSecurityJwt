package com.twd.SpringSecurityJWT.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.twd.SpringSecurityJWT.entity.GbltLoginUnsucessfulLog;

@Repository
public interface LoginUnsuccessfulLogRepository extends JpaRepository<GbltLoginUnsucessfulLog, Long> {

	@Modifying
	@Transactional
	@Query("UPDATE GbltLoginUnsucessfulLog l SET l.gnumIsvalid = 0 WHERE l.gnumIsvalid = 1 AND l.gstrLoginid = :userName")
	int markUserUnsuccessfulLogInvalid(@Param("userName") String userName);

	@Query("SELECT COALESCE(COUNT(l), 0) FROM GbltLoginUnsucessfulLog l WHERE l.gnumIsvalid = 1 AND l.gstrLoginid = :gstrLoginid")
	long countValidByGstrLoginid(String gstrLoginid);
}
