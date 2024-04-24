package com.twd.SpringSecurityJWT.repository.master;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.twd.SpringSecurityJWT.entity.master.GbltMenuMst;

@Repository
public interface MenuRepository extends JpaRepository<GbltMenuMst, Integer> {

	List<GbltMenuMst> findByGnumMenuLevelAndGnumModuleIdAndGnumIsValidAndGnumParentId(Integer level, Integer moduleId,
			Integer gnumIsValid, Long parentMenuId);

	@Query("SELECT m FROM GbltMenuMst m WHERE m.gnumIsValid = 1 AND m.gnumMenuLevel = 2 AND m.gnumMenuId IN :menuIds ORDER BY m.gnumParentId, m.gnumDisplayOrder")
	List<GbltMenuMst> findLevelTwoMenusByIds(@Param("menuIds") List<Long> menuIds);

	// List<GbltMenuMst> findByGnumMenuIdInAndGnumIsValidOrderBy(List<Long> menuId,
	// Integer isValid);

	GbltMenuMst findByGnumMenuIdAndGnumIsValid(Long gnumMenuId, Integer gnumIsValid);

	@Query("select m from GbltMenuMst m  where m.gnumIsValid = 1 and gnumMenuLevel=0 order by m.gnumMenuId")
	List<GbltMenuMst> findAllRootMenus();

	@Query("select m from GbltMenuMst m  where m.gnumIsValid = 1 and gnumMenuLevel=1 ")
	List<GbltMenuMst> findAllIntermediateMenus();

	List<GbltMenuMst> findByGnumMenuIdIn(List<Long> ids);
}
