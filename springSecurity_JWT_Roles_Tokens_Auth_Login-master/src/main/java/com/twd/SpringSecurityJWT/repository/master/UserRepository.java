package com.twd.SpringSecurityJWT.repository.master;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.twd.SpringSecurityJWT.entity.master.GbltUserMst;

@Repository
public interface UserRepository extends JpaRepository<GbltUserMst, Integer> {

	public GbltUserMst findByGstrUserName(String gstrUserName);

	public GbltUserMst findByGnumUserId(Integer gnumUserId);

	@Modifying
	@Query("UPDATE GbltUserMst u SET u.gnumIsLock = 1 WHERE u.gnumIsValid = 1 AND u.gstrUserName = :gstrUserName")
	int lockUser(String gstrUserName);

	@Modifying
	@Transactional
	@Query("UPDATE GbltUserMst u " + "SET u.gstrPassword = :password, " + "u.gstrOldPassword = :oldPassword, "
			+ "u.gdtLstModDate = current_timestamp(), " + "u.gdtChangePasswordDate = current_timestamp(), "
			+ "u.gnumLstModSeatId = :lstModSeatId " + "WHERE u.gnumUserId = :userId")
	int changePassword(String password, String oldPassword, int lstModSeatId, String userId);

}
