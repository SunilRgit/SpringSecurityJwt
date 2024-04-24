package com.twd.SpringSecurityJWT.service.master;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.twd.SpringSecurityJWT.bean.master.NationalityBean;
import com.twd.SpringSecurityJWT.repository.master.NationalityRepository;
import com.twd.SpringSecurityJWT.util.BeanUtils;

@Service
@Transactional
public class NationalityService {

	@Autowired
	private NationalityRepository nationalityRepository;

	public List<NationalityBean> getNationalityList() {
		return BeanUtils.copyListProperties(nationalityRepository.findByGnumIsValidOrderByGnumNationalityCode(1),
				NationalityBean.class);
	}

	public String getNationalityName(Integer gnumNationalityCode) {
		return nationalityRepository.findGstrNationalityNameByGnumNationalityCodeAndGnumIsValid(gnumNationalityCode, 1);
	}

}
