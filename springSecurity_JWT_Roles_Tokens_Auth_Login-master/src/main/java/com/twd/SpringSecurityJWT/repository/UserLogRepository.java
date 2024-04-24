package com.twd.SpringSecurityJWT.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.twd.SpringSecurityJWT.entity.GbltUserLog;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface UserLogRepository extends JpaRepository<GbltUserLog, Long> {

	@Modifying
	@Query("UPDATE GbltUserLog l SET l.gdtLoguttDate = current_timestamp() WHERE l.gdtLoguttDate is NULL "
			+ "AND l.gnumUserid = :gnumUserid AND l.gnumSeatId = :gnumSeatId AND l.gstrIpNumber = :gstrIpNumber AND l.gnumHospitalCode = :gnumHospitalCode")
	int updateLogoutTime(Integer gnumUserid, Integer gnumSeatId, String gstrIpNumber, Integer gnumHospitalCode);
}
