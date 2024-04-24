package com.twd.SpringSecurityJWT.hlp;

import java.util.List;

import org.springframework.stereotype.Component;

import com.twd.SpringSecurityJWT.bean.master.MenuBean;

@Component
public class MenuHLP {

	public String getMenuHLP(List<MenuBean> lstMenus) {
		Integer count = 0;
		StringBuffer result = new StringBuffer("");
		if (lstMenus != null && lstMenus.size() > 0) {
			for (MenuBean objMenu : lstMenus) {
				count++;
				result.append("<li class='nav-item'><a class='nav-link' data-bs-toggle='collapse' title="
						+ objMenu.getGstMenuName() + " href='#href" + count
						+ "' aria-expanded='false' aria-controls='href" + count + "'> <i" + "	class='typcn "
						+ objMenu.getGstrImageClass() + " menu-icon-typ'></i> <span title=" + objMenu.getGstMenuName()
						+ "	class='menu-title'>" + objMenu.getGstMenuName() + "</span> <i class='menu-arrow'></i>"
						+ "</a>");
				if (objMenu.getSubMenuList() != null && objMenu.getSubMenuList().size() > 0) {
					result.append("<div class='collapse' id='href" + count + "'>");
					result.append("	<ul class='nav flex-column sub-menu'>");
					for (MenuBean objSubMenu : objMenu.getSubMenuList()) {
						count++;
						result.append("<li class='nav-item'><a class='nav-link' data-bs-toggle='collapse' title="
								+ objSubMenu.getGstMenuName() + " href='#href" + count
								+ "-sub' aria-expanded='false' aria-controls='href" + count
								+ "-sub' onclick=\"toggleSecondDiv(" + count + ");\"><span title='"
								+ objSubMenu.getGstMenuName() + "'	class='menu-title'>" + objSubMenu.getGstMenuName()
								+ "</a>");
						if (objSubMenu.getSubMenuList() != null && objSubMenu.getSubMenuList().size() > 0) {
							result.append("<div class='collapse' id='secondDiv" + count + "'>");
							result.append("	<ul class=''>");
							for (MenuBean objSub2Menu : objSubMenu.getSubMenuList()) {

								result.append("<li class=''><a class='nav-link' title='" + objSub2Menu.getGstMenuName()
					             + "' href='#' aria-expanded='false' onclick=\"loadContent('" + objSub2Menu.getGstrUrl() + "')\"><span title='" 
					             + objSub2Menu.getGstMenuName() + "' class='menu-title'>" + objSub2Menu.getGstMenuName() + "</span></a>");


								result.append("</li>");
							}
							result.append("</ul></div>");
						}
						result.append("</li>");
					}
					result.append("</ul></div>");
				}
				result.append("</li>");
			}
		}
		return result.toString();
	}

}
