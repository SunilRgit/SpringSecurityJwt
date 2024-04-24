package com.twd.SpringSecurityJWT.util;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BeanUtils {

	private static final Logger log = LoggerFactory.getLogger(BeanUtils.class);

	/**
	 * Copies the properties of source object to target object.
	 * 
	 * @param source the source object
	 * @param target the target object
	 * @throws IllegalArgumentException if any one of the parameter objects is null
	 */
	public static void copyProperties(Object source, Object target) {
		Objects.requireNonNull(source, "Source Object cannot be null");
		Objects.requireNonNull(target, "Target Object cannot be null");

		try {
			org.springframework.beans.BeanUtils.copyProperties(source, target);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new RuntimeException("Error copying properties", e);
		}
	}

	/**
	 * Copies the properties of the source object to a new target object.
	 * 
	 * @param <S>        the type of the source object
	 * @param <T>        the type of the target object
	 * @param source     the source object
	 * @param targetType the target class type
	 * @return the target object with source object bean properties
	 * @throws IllegalArgumentException if the source object is null
	 */
	public static <S, T> T copyProperties(S source, Class<T> targetType) {
		Objects.requireNonNull(source, "Source Object cannot be null");
		return copySourceToTarget(source, targetType);
	}

	/**
	 * Copies the bean properties of source objects from the source list and
	 * populates them into the target list by creating new target objects.
	 * 
	 * @param <S>        the type of the source object
	 * @param <T>        the type of the target object
	 * @param sourceList the source object list
	 * @param targetType the target object type
	 * @return the target object list with populated properties
	 */
	public static <S, T> List<T> copyListProperties(List<S> sourceList, Class<T> targetType) {
		return sourceList.stream().map(source -> copySourceToTarget(source, targetType)).collect(Collectors.toList());
	}

	private static <S, T> T copySourceToTarget(S source, Class<T> targetType) {
		T target;
		try {
			target = targetType.getDeclaredConstructor().newInstance();
			copyProperties(source, target);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new RuntimeException("Error copying properties", e);
		}
		return target;
	}
}
