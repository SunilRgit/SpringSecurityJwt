package com.twd.SpringSecurityJWT.service.master;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.twd.SpringSecurityJWT.bean.master.AppellationBean;
import com.twd.SpringSecurityJWT.repository.master.AppellationRepository;
import com.twd.SpringSecurityJWT.util.BeanUtils;

@Service
@Transactional
public class AppellationService {

	@Autowired
	private AppellationRepository appellationDAO;

	public List<AppellationBean> getAppellationList() {
		return BeanUtils.copyListProperties(appellationDAO.findByGnumIsvalidOrderByGstrAppellationNameAsc(1),
				AppellationBean.class);
	}
}
