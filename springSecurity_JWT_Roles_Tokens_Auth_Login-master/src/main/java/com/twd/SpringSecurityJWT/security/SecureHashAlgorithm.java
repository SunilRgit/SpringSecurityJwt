package com.twd.SpringSecurityJWT.security;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SecureHashAlgorithm {

	public static String getRandomSalt(int nSaltSize) {
		SecureRandom objRandom = new SecureRandom();
		byte[] randomSalt = new byte[nSaltSize];
		objRandom.nextBytes(randomSalt);

		return randomSalt.toString();
	}

	public static String generateRandom() throws Exception {
		SecureRandom sr = SecureRandom.getInstance("SHA1PRNG");
		// LOGGER.info ( "SecureRandom : " + sr.nextInt () ); //if you
		// enable then output return in negative
		return String.valueOf(Math.abs(sr.nextInt()));
	}

	public static String[] sanitizedData(String... input) {
		String sanitizedData[] = new String[input.length];
		int index = 0;

		for (String i : input) {
			sanitizedData[index++] = i.replaceAll("[\'~!@#$%^&*()\";: <>?/,.]", "�");
		}
		return sanitizedData;
	}

	private static String convertToHex(byte[] data) {
		StringBuffer buf = new StringBuffer();
		for (int i = 0; i < data.length; i++) {
			int halfbyte = (data[i] >>> 4) & 0x0F;
			int two_halfs = 0;
			do {
				if ((0 <= halfbyte) && (halfbyte <= 9))
					buf.append((char) ('0' + halfbyte));
				else
					buf.append((char) ('a' + (halfbyte - 10)));
				halfbyte = data[i] & 0x0F;
			} while (two_halfs++ < 1);
		}
		return buf.toString();
	}

	public static String SHA1(String text) throws NoSuchAlgorithmException, UnsupportedEncodingException {
		MessageDigest md;
		md = MessageDigest.getInstance("SHA-1");
		byte[] sha1hash = new byte[40];
		md.update(text.getBytes("iso-8859-1"), 0, text.length());
		sha1hash = md.digest();
		return convertToHex(sha1hash);
	}

	/**
	 * Gets the md5 hash.
	 *
	 * @param strContent the str content
	 * @return the md5 hash
	 */
	public synchronized static String getMd5Hash(String strContent) {

		StringBuffer sb = new StringBuffer("");

		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(strContent.getBytes());
			byte byteData[] = md.digest();
			// convert the byte to hex format method 1

			for (int i = 0; i < byteData.length; i++) {
				sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
			}

		} catch (NoSuchAlgorithmException e) {
			log.error(e.getMessage());
			e.printStackTrace();
		}
		return sb.toString();

	}

	/*
	 * public static void main(String args[]) { String sanitizedData[] =
	 * SecureHashAlgorithm.sanitizedData("vijay\'~ !@#$%^&*()\";:<>?/,.", "jessy%");
	 * log.info(sanitizedData[0] + "\n" + sanitizedData[1]); }
	 */

}
