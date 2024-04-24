package com.twd.SpringSecurityJWT.repository.master;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.twd.SpringSecurityJWT.entity.master.GbltAppellationMst;

@Repository
public interface AppellationRepository extends JpaRepository<GbltAppellationMst, Integer> {
	// You can define custom query methods here if needed
	
	 // Method to get all valid appellations
    List<GbltAppellationMst> findByGnumIsvalidOrderByGstrAppellationNameAsc(Integer gnumIsvalid);

    // Method to get the appellation name by appellation code
    String findGstrAppellationNameByGnumAppellationCodeAndGnumIsvalid(Integer gnumAppellationCode, Integer gnumIsvalid);
}
