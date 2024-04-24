package com.twd.SpringSecurityJWT.repository.master;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.twd.SpringSecurityJWT.entity.master.GbltSeatRoleMst;

@Repository
public interface SeatRoleRepository extends JpaRepository<GbltSeatRoleMst, Integer> {

	List<GbltSeatRoleMst> findGnumRoleIdByGblIsvalidAndGnumSeatid(Integer gblIsvalid, Integer seatId);
}
