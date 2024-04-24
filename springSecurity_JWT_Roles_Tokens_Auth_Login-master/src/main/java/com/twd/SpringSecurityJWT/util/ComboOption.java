package com.twd.SpringSecurityJWT.util;

public class ComboOption {

	public String value;

	public String display;

	public ComboOption() {
		super();
		this.value = "0";
		this.display = "Select Value";
	}

	public ComboOption(String value, String display) {
		super();
		this.value = value;
		this.display = display;
	}

	public ComboOption(Integer value, String display) {
		super();
		this.value = String.valueOf(value);
		this.display = display;
	}

	public ComboOption(Long value, String display) {
		super();
		this.value = String.valueOf(value);
		this.display = display;
	}

	public String getValue() {
		return value;
	}

	public String getDisplay() {
		return display;
	}

}
