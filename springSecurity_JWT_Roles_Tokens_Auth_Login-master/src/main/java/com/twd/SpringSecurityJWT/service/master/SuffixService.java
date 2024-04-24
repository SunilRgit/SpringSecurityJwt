package com.twd.SpringSecurityJWT.service.master;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.twd.SpringSecurityJWT.bean.master.SuffixBean;
import com.twd.SpringSecurityJWT.repository.master.SuffixRepository;
import com.twd.SpringSecurityJWT.util.BeanUtils;

@Service
@Transactional
public class SuffixService {

	@Autowired
	private SuffixRepository suffixRepository;

	public List<SuffixBean> getSuffixList() {
		return BeanUtils.copyListProperties(suffixRepository.findByGnumIsValid(1), SuffixBean.class);
	}

}
