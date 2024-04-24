package com.twd.SpringSecurityJWT.util;

import java.io.UnsupportedEncodingException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class GlobalUtil {

	/**
	 * returns combo string
	 * <code>&lt;option value='0'&gt;Select Value&lt;/option&gt; </code> based on
	 * the provided ComboOption List and defaultOptions
	 * 
	 * @param defaultOption - 0^Select Value#1^All returns
	 *                      <code>&lt;option value='0'&gt;Select Value&lt;/option&gt; &lt;option value='1'&gt;All&lt;/option&gt; </code>
	 * 
	 *                      * @param defaultValue - the value should be selected
	 * 
	 * @return options string
	 */
	public String getOptions(final List<ComboOption> list, final String defaultOption, final String defaultValue) {

		StringBuffer result = new StringBuffer();

		if (defaultOption != null && defaultOption.length() > 0 && defaultOption.contains("^")) {

			result.append(new ArrayList<String>(Arrays.asList(defaultOption.split("#"))).stream()
					.map(s -> "<option value='" + s.split("\\^")[0] + "' "
							+ (s.split("\\^")[0].equals(defaultValue) ? "selected" : "") + ">" + s.split("\\^")[1]
							+ "</option>")
					.collect(Collectors.joining("")));

		} else {

			if (list == null)
				result.append("<option value='0'>Select Value</option>");

		}

		if (list != null) {

			// list.sort(Comparator.comparing(ComboOption::getDisplay));

			for (ComboOption comboOption : list) {

				if (comboOption.value.equals(defaultValue))
					result.append(
							"<option value='" + comboOption.value + "' selected >" + comboOption.display + "</option>");
				else
					result.append("<option value='" + comboOption.value + "' >" + comboOption.display + "</option>");

			}

			list.clear();

		}
		return result.toString();

	}

	public String getOptionsDisplayCSS(final List<ComboOption> list, final String defaultOption,
			final String defaultValue) {

		StringBuffer result = new StringBuffer();

		if (defaultOption != null && defaultOption.length() > 0 && defaultOption.contains("^")) {

			result.append(new ArrayList<String>(Arrays.asList(defaultOption.split("#"))).stream()
					.map(s -> "<option class='lessPadding' value='" + s.split("\\^")[0] + "' "
							+ (s.split("\\^")[0].equals(defaultValue) ? "selected" : "") + ">" + s.split("\\^")[1]
							+ "</option>")
					.collect(Collectors.joining("")));

		} else {

			if (list == null)
				result.append("<option class='lessPadding' value='0'>Select Value</option>");

		}

		if (list != null) {

			// list.sort(Comparator.comparing(ComboOption::getDisplay));

			for (ComboOption comboOption : list) {

				if (comboOption.value.equals(defaultValue))
					result.append("<option class='lessPadding' value='" + comboOption.value + "' selected >"
							+ comboOption.display + "</option>");
				else
					result.append("<option class='lessPadding' value='" + comboOption.value + "' >"
							+ comboOption.display + "</option>");

			}

			list.clear();

		}
		return result.toString();

	}

	/**
	 * returns combo string
	 * <code>&lt;option value='0'&gt;Select Value&lt;/option&gt; </code> based on
	 * the provided defaultOptions
	 * 
	 * @param defaultOption - 0^Select Value#1^All returns
	 *                      <code>&lt;option value='0'&gt;Select Value&lt;/option&gt; &lt;option value='1'&gt;All&lt;/option&gt; </code>
	 * 
	 * @param defaultValue  - the value should be selected
	 * 
	 * @return - options string
	 */
	public String getOptions(final String defaultOption, final String defaultValue) {

		StringBuffer result = new StringBuffer();

		if (defaultOption != null && defaultOption.length() > 0 && defaultOption.contains("^")) {

			result.append(new ArrayList<String>(Arrays.asList(defaultOption.split("#"))).stream()
					.map(s -> "<option value='" + s.split("\\^")[0] + "' "
							+ (s.split("\\^")[0].equals(defaultValue) ? "selected" : "") + ">" + s.split("\\^")[1]
							+ "</option>")
					.collect(Collectors.joining("")));

		} else {

			result.append("<option value='0'>Select Value</option>");

		}

		return result.toString();

	}

	/**
	 * returns the given amount in Decimal Format.
	 * 
	 * @param amount      amount value in int, float, double.
	 * @param decimalSize Size of the decimal in integer, 3 will convert the amount
	 *                    in 0.000 Format. Negative integer or zero will return the
	 *                    amount without Decimals.
	 * @return amount by converting the value in decimal Format by considering the
	 *         decimalSize.
	 * @throws Exception the exception
	 * @see #getAmountWithDecimal(String, int)
	 */

	public String getAmountWithDecimal(final double amount, final int decimalSize) {

		String strAmt = "";

		StringBuffer strPattern = new StringBuffer();

		DecimalFormat df = new DecimalFormat();

		if (decimalSize > 0) {

			strPattern.append(".");

			for (int i = 1; i <= decimalSize; i++) {

				strPattern = strPattern.append("0");

			}

		} else {

			strPattern.append("0");

		}

		df.applyPattern(strPattern.toString());

		if (amount == 0) {

			strAmt = "0" + strPattern.toString();

		} else {

			strAmt = df.format(amount);
		}

		if (df != null)

			df = null;

		if (strPattern != null)

			strPattern = null;

		return strAmt;

	}

	/**
	 * returns the given amount in Decimal Format.
	 * 
	 * @param amount      amount value in String
	 * @param decimalSize Size of the decimal in integer, 3 will convert the amount
	 *                    in 0.000 Format. Negative integer or zero will return the
	 *                    amount without Decimals.
	 * @return amount by converting the value in decimal Format by considering the
	 *         decimalSize.
	 * @throws Exception when amount value other than Digits.
	 * @see #getAmountWithDecimal(double, int)
	 */

	public String getAmountWithDecimal(final String amount, final int decimalSize) {

		String strAmt = "";

		StringBuffer strPattern = new StringBuffer();

		DecimalFormat df = new DecimalFormat();

		if (decimalSize > 0) {

			strPattern.append(".");

			for (int i = 1; i <= decimalSize; i++) {

				strPattern = strPattern.append("0");

			}

		} else {

			strPattern.append("0");

		}

		df.applyPattern(strPattern.toString());

		if (!amount.equals("0")) {

			strAmt = df.format(Double.parseDouble(amount));

		} else {

			strAmt = "0" + strPattern.toString();
		}

		if (df != null)

			df = null;

		if (strPattern != null)

			strPattern = null;

		return strAmt;

	}

	/**
	 * Returns Application Server Date dtFormat --> date format[dd/MM/yyyy,
	 * dd/MMM/yyyy etc]
	 * 
	 * if dtFormat is blank then default format is dd/MM/yyyy.
	 * 
	 * @param dtFormat Date Format in String.
	 * @return Application Server Date in required Format.
	 * @throws Exception the exception
	 * @see #getDSDate(String)
	 */
	public String getASDate(final String dtFormat) throws Exception {

		String dtStr = "";
		String defFormat = "";
		Calendar c = null;
		SimpleDateFormat dateFormat = null;

		defFormat = dtFormat;
		if (defFormat.equals(""))
			defFormat = "dd/MM/yyyy";

		try {
			c = Calendar.getInstance();
			dateFormat = new SimpleDateFormat(defFormat);
			dtStr = dateFormat.format(c.getTime());

		} catch (Exception e) {

			throw e;
		} finally {
			if (c != null) {
				c.clear();
				c = null;
			}
			if (dateFormat != null)
				dateFormat = null;
		}

		return dtStr;
	}

	public Integer getCurrentQuarter(final Date d) {

		Calendar c = Calendar.getInstance();
		c.setTime(d);

		int month = c.get(Calendar.MONTH);

		return (month >= Calendar.JANUARY && month <= Calendar.MARCH) ? 4
				: (month >= Calendar.APRIL && month <= Calendar.JUNE) ? 1
						: (month >= Calendar.JULY && month <= Calendar.SEPTEMBER) ? 2 : 3;

	}

	/**
	 * adds no of days from the provided date
	 * 
	 * @param date - Date
	 * @param days - positive integer
	 * @return
	 */
	public Date addDays(final Date date, final Integer days) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.DATE, days);

		return cal.getTime();
	}

	/**
	 * just days difference (time will not be considered)
	 * 
	 * @param dateOne
	 * @param dateTwo
	 * @return
	 */
	public Long daysBetween(final Date dateOne, final Date dateTwo) {
		long difference = (dateOne.getTime() - dateTwo.getTime()) / 86400000;
		return Math.abs(difference);
	}

	/**
	 * compares two dates and returns 0 - if both dates are same , 1 date One is
	 * greater than date Two , -1 date one is less than date two
	 * 
	 * @param dateOne
	 * @param dateTwo
	 * @return 0 , 1 , -1
	 */
	public int compareDate(final Date dateOne, final Date dateTwo) {

		long difference = (dateOne.getTime() - dateTwo.getTime()) / 86400000;
		return Long.signum(difference);
	}

	/**
	 * subtract no of days from the provided date
	 * 
	 * @param date - Date
	 * @param days - positive integer
	 * @return
	 */
	public Date subtractDays(final Date date, final Integer days) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.DATE, -days);

		return cal.getTime();
	}

	public Date stringToDate(final String dateString, final String format) {

		SimpleDateFormat sdf = null;
		Date d = null;
		try {
			sdf = new SimpleDateFormat(getDefaultDateFormat(format));
			d = sdf.parse(dateString);
		} catch (ParseException e) {
			log.error(e.getMessage());
			e.printStackTrace();
		} finally {

			sdf = null;
		}

		return d;

	}

	public String dateToString(final Date date, final String format) {

		SimpleDateFormat sdf = new SimpleDateFormat(getDefaultDateFormat(format));
		return sdf.format(date);

	}

	private String getDefaultDateFormat(final String format) {

		if (format == null || format.trim().length() == 0)
			return "dd-MMM-yyyy";
		else
			return format;

	}

	private static <T> String buildOptionGeneric(GenericCombo<T> option, boolean isSelected) {
		return "<option value='" + option.getValue() + "'" + (isSelected ? " selected" : "") + ">" + option.getDisplay()
				+ "</option>";
	}

	@SafeVarargs
	public static <T> String getGenericOptions(final List<GenericCombo<T>> list, final T defaultValue,
			GenericCombo<T>... defaultOptions) {
		String temp = "";
		if (defaultOptions != null)
			temp = Arrays.asList(defaultOptions).stream()
					.map(option -> buildOptionGeneric(option, option.getValue().equals(defaultValue)))
					.collect(Collectors.joining());

		if (list != null)

			return temp
					+ list.stream().map(option -> buildOptionGeneric(option, option.getValue().equals(defaultValue)))
							.collect(Collectors.joining());
		else
			return temp + buildOptionGeneric(new GenericCombo<Integer>(0, "Select Value"), false);

	}

	@SafeVarargs
	public static <T> String getGenericOptions(final List<GenericCombo<T>> list, GenericCombo<T>... defaultOptions) {
		return getGenericOptions(list, null, defaultOptions);

	}

	private String buildOption(ComboOption option, boolean isSelected) {
		return "<option value='" + option.value + "'" + (isSelected ? " selected" : "") + ">" + option.display
				+ "</option>";
	}

	private String buildOption(ComboOption option) {
		return "<option value='" + option.value + "'>" + option.display + "</option>";
	}

	public String getOptions(final List<ComboOption> list, final String defaultValue, ComboOption... defaultOptions) {
		String temp = "";
		if (defaultOptions != null) {
			if (defaultValue != null)
				temp = Arrays.asList(defaultOptions).stream()
						.map(option -> buildOption(option, option.value.equals(defaultValue)))
						.collect(Collectors.joining());
			else
				temp = Arrays.asList(defaultOptions).stream().map(this::buildOption).collect(Collectors.joining());
		}

		if (list != null) {
			if (defaultValue != null)
				return temp + list.stream().map(option -> buildOption(option, option.value.equals(defaultValue)))
						.collect(Collectors.joining());
			else
				return temp + list.stream().map(this::buildOption).collect(Collectors.joining());
		} else if (temp.length() > 1)
			return temp;
		else
			return buildOption(new ComboOption());

	}

	public String getOptions(final List<ComboOption> list, ComboOption... defaultOptions) {
		return getOptions(list, null, defaultOptions);
	}

	public String getOptions(ComboOption... defaultOptions) {
		return getOptions(null, null, defaultOptions);
	}

	public Date convertStringToDate(String dateString) {
		Date date = null;
		DateFormat df = new SimpleDateFormat("dd-MMM-yyyy");
		try {
			date = df.parse(dateString);
		} catch (Exception ex) {
			log.error(ex.getMessage());
			// log.info(ex);
		}
		return date;
	}

	public Timestamp convertStringToTimeStamp(String dateString) {
		try {
			DateFormat dfWithTime = new SimpleDateFormat("dd-MMM-yyyy HH:mm:ss.SSS");
			DateFormat dfWithoutTime = new SimpleDateFormat("dd-MMM-yyyy");

			Date date;

			if (dateString.contains(":")) {
				date = dfWithTime.parse(dateString);
			} else {
				// If time part is missing, set it to midnight
				date = dfWithoutTime.parse(dateString + " 00:00:00.000");
			}

			return new Timestamp(date.getTime());
		} catch (ParseException ex) {
			ex.printStackTrace();
			return null;
		}
	}

	public String postMail(String recipients, String subject, String message, String from, Integer gnumMailSlNo,
			String strFromEmail, String strPassword) throws MessagingException, UnsupportedEncodingException {
		boolean debug = false;

		String strMailResponse = "";

		Properties props = new Properties();
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", "587");
		props.put("mail.smtp.socketFactory.port", "465");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("java.net.preferIPv4Stack", "true");
		props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");

		Authenticator auth = new Authenticator() {
			// override the getPasswordAuthentication method
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(strFromEmail, strPassword);
			}
		};

		Session session = null;
		try {
			session = Session.getInstance(props, auth);
			session.setDebug(debug);
			// create a message
			Message msg = new MimeMessage(session);

			// set the from and to address
			msg.addHeader("Content-type", "text/HTML; charset=UTF-8");
			msg.addHeader("format", "flowed");
			msg.addHeader("Content-Transfer-Encoding", "8bit");
			InternetAddress addressFrom = new InternetAddress(strFromEmail, "MUHS");
			msg.setFrom(addressFrom);

			msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipients, false));
			msg.addRecipient(Message.RecipientType.BCC, new InternetAddress(strFromEmail));

			// Setting the Subject and Content Type
			msg.setSubject(subject);
			msg.setContent(message, "text/HTML");
			System.out.println("Message is ready");

			try {
				Transport.send(msg);
				strMailResponse = "Email Sent Successfully";
			} catch (MessagingException e) {
				strMailResponse = e.getMessage();
				System.out.println("message " + e.getMessage());
				System.out.println("mail not sent");
			}
		} catch (Exception e) {
			strMailResponse = e.getMessage();
			e.printStackTrace();
		}

		return strMailResponse;
	}

}
