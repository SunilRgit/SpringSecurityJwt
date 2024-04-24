package com.twd.SpringSecurityJWT.service.master;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.twd.SpringSecurityJWT.bean.master.MenuBean;
import com.twd.SpringSecurityJWT.entity.master.GbltMenuMst;
import com.twd.SpringSecurityJWT.entity.master.GbltRoleMenuMst;
import com.twd.SpringSecurityJWT.entity.master.GbltSeatRoleMst;
import com.twd.SpringSecurityJWT.repository.master.MenuRepository;
import com.twd.SpringSecurityJWT.repository.master.RoleMenuRepository;
import com.twd.SpringSecurityJWT.util.BeanUtils;

@Service
@Transactional
public class MenuService {

	@Autowired
	private MenuRepository menuRepository;

	@Autowired
	private RoleMenuRepository roleMenuRepository;

	public List<MenuBean> getMenusMappedWithUser(List<GbltSeatRoleMst> mappedRoles) throws Exception {
		List<GbltMenuMst> rootMenusList = new ArrayList<>();
		List<GbltMenuMst> intermediateMenusList = new ArrayList<>();
		List<GbltMenuMst> mappedMenusList = new ArrayList<>();
		Map<Long, Integer> menuOrder = new HashMap<>();
		if (!mappedRoles.isEmpty()) {
			List<GbltRoleMenuMst> mappedMenusWithRole = roleMenuRepository
					.findByGnumRoleIdInAndGnumIsvalidOrderByGnumDisplayOrderAscGnumMenuIdAsc(
							mappedRoles.stream().map(GbltSeatRoleMst::getGnumRoleId).toList(), 1);

			mappedMenusList = menuRepository
					.findLevelTwoMenusByIds(mappedMenusWithRole.stream().map(GbltRoleMenuMst::getGnumMenuId).toList());

			rootMenusList = menuRepository.findAllRootMenus();
			intermediateMenusList = menuRepository.findAllIntermediateMenus();

		}

		List<MenuBean> menusToDisplay = processMenus(BeanUtils.copyListProperties(mappedMenusList, MenuBean.class),
				BeanUtils.copyListProperties(rootMenusList, MenuBean.class),
				BeanUtils.copyListProperties(intermediateMenusList, MenuBean.class));
		sortMenus(menusToDisplay, menuOrder);
		return menusToDisplay;
	}

	private List<MenuBean> processMenus(List<MenuBean> menus, List<MenuBean> rootMenus,
			List<MenuBean> intermediateMenus) {
		List<MenuBean> processedMenus = new ArrayList<>();

		for (MenuBean rootMenu : rootMenus) {
			MenuBean processedRootMenu = new MenuBean(rootMenu); // Create a copy of the root menu
			List<MenuBean> processedIntermediateMenus = new ArrayList<>();

			// Find intermediate menus for the current root menu
			for (MenuBean intermediateMenu : intermediateMenus) {
				if (intermediateMenu.getGnumParentId().equals(rootMenu.getGnumMenuId())) {
					MenuBean processedIntermediateMenu = new MenuBean(intermediateMenu); // Create a copy of the
																							// intermediate menu
					List<MenuBean> processedSubmenus = new ArrayList<>();

					// Find submenus for the current intermediate menu
					for (MenuBean menu : menus) {
						if (menu.getGnumParentId().equals(intermediateMenu.getGnumMenuId())) {
							processedSubmenus.add(new MenuBean(menu)); // Create a copy of the submenu
						}
					}

					processedIntermediateMenu.setSubMenuList(processedSubmenus);
					processedIntermediateMenus.add(processedIntermediateMenu);
				}
			}

			processedRootMenu.setSubMenuList(processedIntermediateMenus);
			processedMenus.add(processedRootMenu);
		}

		return processedMenus;
	}

	private void sortMenus(List<MenuBean> menusToDisplay, Map<Long, Integer> menuOrder) {
		for (MenuBean menu : menusToDisplay) {
			List<MenuBean> subMenuList = menu.getSubMenuList();
			if (subMenuList != null && !subMenuList.isEmpty()) {
				subMenuList.sort(Comparator.comparing(o -> menuOrder.getOrDefault(o.getGnumMenuId(), 0)));
				sortMenus(subMenuList, menuOrder);
			}
		}
	}
}
