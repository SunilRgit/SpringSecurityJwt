package com.twd.SpringSecurityJWT.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class DateHelperMethods {

	private static final String DATE_FORMAT_DEFAULT = "dd-MMM-yyyy HH:mm:ss";

	public static Date getDateObject(long ntime) {
		Date objDate = null;
		try {
			objDate = new Date(ntime);
		} catch (Exception e) {
			log.error(e.getMessage());
			e.printStackTrace();
			objDate = null;
		}
		return objDate;
	}

	public static Date getDateObject(String strDate) {
		Date objDate = null;
		try {
			SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT_DEFAULT);
			objDate = sdf.parse(strDate);
		} catch (ParseException pe) {
			log.error(pe.getMessage());
			// pe.printStackTrace();
			objDate = null;
		} catch (Exception e) {
			log.error(e.getMessage());
			e.printStackTrace();
			objDate = null;
		}
		return objDate;
	}

	public static Date getDateObject(String strDate, String strFormat) {
		Date objDate = null;
		try {
			SimpleDateFormat sdf = (SimpleDateFormat) DateFormat.getInstance();
			if (strFormat == null || strFormat.equals("")) {
				sdf.applyPattern(DATE_FORMAT_DEFAULT);
			} else {
				sdf.applyPattern(strFormat);
			}
			objDate = sdf.parse(strDate);
		} catch (ParseException pe) {
			log.error(pe.getMessage());
			// pe.printStackTrace();
			objDate = null;
		} catch (Exception e) {
			log.error(e.getMessage());
			e.printStackTrace();
			objDate = null;
		}
		return objDate;
	}

	public static String getDateString(long ntime) {
		String strDate = null;
		try {
			SimpleDateFormat sf = (SimpleDateFormat) DateFormat.getInstance();
			Date objDate = getDateObject(ntime);
			sf.applyPattern(DATE_FORMAT_DEFAULT);
			strDate = sf.format(objDate);
		} catch (Exception e) {
			log.error(e.getMessage());
			e.printStackTrace();
			strDate = null;
		}
		return strDate;
	}

	public static String getDateString(long ntime, String strFormat) {
		String strDate = null;
		try {
			SimpleDateFormat sf = (SimpleDateFormat) DateFormat.getInstance();
			Date objDate = getDateObject(ntime);
			if (strFormat == null || strFormat.equals("")) {
				sf.applyPattern(DATE_FORMAT_DEFAULT);
			} else {
				sf.applyPattern(strFormat);
			}
			strDate = sf.format(objDate);
		} catch (Exception e) {
			log.error(e.getMessage());
			e.printStackTrace();
			strDate = null;
		}
		return strDate;
	}

	public static String getDateString(Date objDate) {
		String strDate = null;
		try {
			SimpleDateFormat sf = (SimpleDateFormat) DateFormat.getInstance();
			sf.applyPattern(DATE_FORMAT_DEFAULT);
			strDate = sf.format(objDate);
		} catch (Exception e) {
			log.error(e.getMessage());
			e.printStackTrace();
			strDate = null;
		}
		return strDate;
	}

	public static String getDateString(Date objDate, String strFormat) {
		String strDate = null;
		try {
			SimpleDateFormat sf = (SimpleDateFormat) DateFormat.getInstance();
			if (strFormat == null || strFormat.equals("")) {
				sf.applyPattern(DATE_FORMAT_DEFAULT);
			} else {
				sf.applyPattern(strFormat);
			}
			strDate = sf.format(objDate);
		} catch (Exception e) {
			log.error(e.getMessage());
			e.printStackTrace();
			strDate = null;
		}
		return strDate;
	}

	public static long getTimeStamp(Date objDate) {
		long nTime = -1;
		try {
			nTime = objDate.getTime();
		} catch (Exception e) {
			log.error(e.getMessage());
			e.printStackTrace();
			nTime = -1;
		}
		return nTime;
	}

	public static long getTimeStamp(String strDate) {
		long nTime = -1;
		try {
			Date objDate = getDateObject(strDate);
			nTime = objDate.getTime();
		} catch (Exception e) {
			log.error(e.getMessage());
			e.printStackTrace();
			nTime = -1;
		}
		return nTime;
	}

	public static long getTimeStamp(String strDate, String strFormat) {
		long nTime = -1;
		try {
			Date objDate = getDateObject(strDate, strFormat);
			nTime = objDate.getTime();
		} catch (Exception e) {
			log.error(e.getMessage());
			e.printStackTrace();
			nTime = -1;
		}
		return nTime;
	}

	public static String getSysdate(java.util.Date _dt, String _pattern) {
		String strDate = "";
		SimpleDateFormat df = (SimpleDateFormat) DateFormat.getInstance();
		// df.applyPattern("dd/MM/yyyy hh:mm:ss a");
		df.applyPattern(_pattern);
		strDate = df.format(_dt);
		// LOGGER.info("formatedDate" + strDate);
		return strDate;
	}
}
