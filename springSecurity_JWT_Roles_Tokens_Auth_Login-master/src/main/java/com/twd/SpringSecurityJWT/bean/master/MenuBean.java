package com.twd.SpringSecurityJWT.bean.master;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import com.twd.SpringSecurityJWT.bean.GlobalBean;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MenuBean extends GlobalBean {
	/**
	* 
	*/

	public MenuBean(MenuBean menuBean) {
		// Copy primitive properties
		this.gnumParentId = menuBean.getGnumParentId();
		this.gnumMenuId = menuBean.getGnumMenuId();
		this.gstMenuName = menuBean.getGstMenuName();
		this.gstrUrl = menuBean.getGstrUrl();
		this.gstrImageClass = menuBean.getGstrImageClass();
		// Copy other properties similarly

		// Copy the lists
		this.intermediateMenuList = copyList(menuBean.getIntermediateMenuList());
		this.subMenuList = copyList(menuBean.getSubMenuList());
	}

	// Utility method to copy list of MenuBean objects
	private List<MenuBean> copyList(List<MenuBean> originalList) {
		if (originalList == null) {
			return null;
		}
		List<MenuBean> copiedList = new ArrayList<>();
		for (MenuBean menuBean : originalList) {
			copiedList.add(new MenuBean(menuBean));
		}
		return copiedList;
	}

	private static final long serialVersionUID = 1L;

	private Long gnumParentId;

	private Long gnumMenuId;

	private String gstMenuName;

	private Character gstMenuClassId;

	private Integer gnumMenuLevel;

	private Integer gnumDisplayOrder;

	private Long gnumSeatId;

	private Timestamp gdtEntryDate;

	private String gstrUrl;

	private Integer gnumIsValid;

	private Long gnumHl7Code;

	private Integer gnumIsPortal;

	private Integer gnumMenuPosition;

	private String gstrJsFunctionName;

	private Integer gnumApplicationType;

	private Integer gnumModuleId;

	private String gstrImageClass;

	private String varMenuContext;

	private String varModuleName;

	private List<MenuBean> intermediateMenuList;

	private List<MenuBean> subMenuList;
}
