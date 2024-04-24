package com.twd.SpringSecurityJWT.util;

import java.util.Objects;

public class GenericCombo<T> {

	private T value;
	private String display;

	public GenericCombo(T value, String display) {
		super();
		Objects.requireNonNull(value);
		this.value = value;
		this.display = display;
	}

	public T getValue() {
		return value;
	}

	public String getDisplay() {
		return display;
	}

	public static GenericCombo<Integer> defaultOptionInteger() {
		return new GenericCombo<Integer>(0, "Select Value");
	}

	public static GenericCombo<String> defaultOptionString() {
		return new GenericCombo<String>("", "Select Value");
	}

	public static GenericCombo<Long> defaultOptionLong() {
		return new GenericCombo<Long>(0L, "Select Value");
	}

	public static GenericCombo<Integer> allOptionInteger() {
		return new GenericCombo<Integer>(0, "All");
	}

	public static GenericCombo<String> allOptionString() {
		return new GenericCombo<String>("0", "All");
	}

	public static GenericCombo<Long> allOptionLong() {
		return new GenericCombo<Long>(0L, "All");
	}
}
