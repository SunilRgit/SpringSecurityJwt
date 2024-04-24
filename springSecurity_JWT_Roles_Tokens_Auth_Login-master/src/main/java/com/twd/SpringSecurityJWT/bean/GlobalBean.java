package com.twd.SpringSecurityJWT.bean;

import java.io.Serializable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GlobalBean implements Serializable {

	private static final long serialVersionUID = 1L;

	private String id;
	private String strMessage;

	// -1 error message , 0 normal message , 1 warning message
	private int strMessageType = 0;
}
