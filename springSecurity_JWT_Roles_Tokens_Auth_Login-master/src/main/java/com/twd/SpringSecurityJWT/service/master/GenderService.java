package com.twd.SpringSecurityJWT.service.master;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.twd.SpringSecurityJWT.bean.master.GenderBean;
import com.twd.SpringSecurityJWT.repository.master.GenderRepository;
import com.twd.SpringSecurityJWT.util.BeanUtils;

@Service
@Transactional
public class GenderService {

	@Autowired
	private GenderRepository genderRepository;

	public List<GenderBean> getGenderList() {
		return BeanUtils.copyListProperties(genderRepository.findByGnumIsValidOrderByGstrGenderName(1),
				GenderBean.class);
	}

	public String getGenderName(String gstrGenderCode) {
		return genderRepository.findGstrGenderNameByGstrGenderCodeAndGnumIsValid(gstrGenderCode, 1);
	}

}
