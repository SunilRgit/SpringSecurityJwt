package com.twd.SpringSecurityJWT.repository.master;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.twd.SpringSecurityJWT.entity.master.GbltRoleMenuMst;

@Repository
public interface RoleMenuRepository extends JpaRepository<GbltRoleMenuMst, Integer> {

	List<GbltRoleMenuMst> findByGnumRoleIdAndGnumModuleId(Integer roleId, Integer moduleId);

	List<GbltRoleMenuMst> findByGnumMenuIdIn(List<Integer> menuIds);

	List<GbltRoleMenuMst> findByGnumRoleIdInAndGnumIsvalidOrderByGnumDisplayOrderAscGnumMenuIdAsc(
			List<Integer> gnumRoleId, Integer isValid);
}
