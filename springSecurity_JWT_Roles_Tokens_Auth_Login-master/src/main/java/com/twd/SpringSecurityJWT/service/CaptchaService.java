package com.twd.SpringSecurityJWT.service;

import java.awt.Color;
import java.awt.Font;
import java.awt.GradientPaint;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Random;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CaptchaService {

	public void processRequest() throws IOException {
		HttpServletRequest request = (HttpServletRequest) ((ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes()).getRequest();
		HttpServletResponse response = (HttpServletResponse) ((ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes()).getResponse();
		int width = 130;
		int height = 50;
		OutputStream os = null;
		char data[][] = getCaptcheDatas();
		BufferedImage bufferedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		Graphics2D g2d = bufferedImage.createGraphics();
		Font font = new Font("Georgia", Font.BOLD, 23);
		g2d.setFont(font);
		RenderingHints rh = new RenderingHints(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		rh.put(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
		g2d.setRenderingHints(rh);
		GradientPaint gp = new GradientPaint(0, 0, Color.black, 0, height / 2, Color.white, true);
		g2d.setPaint(gp);
		g2d.fillRect(0, 0, width, height);
		g2d.setColor(new Color(0, 0, 0));
		Random r = new Random();
		String captcha = String.copyValueOf(data[0]);
		request.getSession().setAttribute("captcha", captcha);

		int x = 0;
		int y = 0;
		for (int i = 0; i < data[0].length; i++) {
			x += 10 + (Math.abs(r.nextInt()) % 15);
			y = 20 + Math.abs(r.nextInt()) % 20;
			g2d.drawChars(data[0], i, 1, x, y);
		}

		g2d.dispose();

		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Set-Cookie", "SameSite=strict");
		response.setContentType("image/png");
		if (request.getParameter("t") == null) {
			try {
				os = response.getOutputStream();
				ImageIO.write(bufferedImage, "png", os);
			} finally {
				if (os != null) {
					os.close();
				}
			}
		} else {
			response.getWriter().print(encodeToString(bufferedImage, "png"));
		}

	}

	public static String encodeToString(BufferedImage image, String type) {
		String imageString = null;
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		try {
			ImageIO.write(image, type, bos);
			byte[] imageBytes = bos.toByteArray();

			// BASE64Encoder encoder = new BASE64Encoder();
			imageString = Base64.getEncoder().encodeToString(imageBytes);

			bos.close();
		} catch (IOException e) {
			log.error(e.getMessage());
			e.printStackTrace();
		}
		return imageString;
	}

	public static char[][] getCaptcheDatas() {

		Random r = new Random();
		int index = Math.abs(r.nextInt()) % 7;

		if (index < 5)
			index = 5;

		char[][] captche = new char[1][index];

		String randomValue = generateSecureRandomCaptcha().substring(0, index);

		randomValue = randomValue.substring(0, 1) + randomValue.substring(1, 2).toUpperCase()
				+ randomValue.substring(2, 3) + randomValue.substring(3, 4).toUpperCase()
				+ randomValue.substring(4, index);

		captche[0] = randomValue.toCharArray();
		// captche[0] = "1a2B3c".toCharArray();

		return captche;
	}

	/**
	 * Generate secure random number.
	 * 
	 * @param request the request
	 * @return the string
	 */
	public static String generateSecureRandomNumber(HttpServletRequest request) {
		String tokenNo = "";
		try {
			// Initialize SecureRandom
			SecureRandom prng = SecureRandom.getInstanceStrong();
			// Generate a random number
			String randomNum = String.valueOf(prng.nextInt());
			// Get its digest
			MessageDigest sha = MessageDigest.getInstance("SHA-256");
			byte[] result = sha.digest(randomNum.getBytes());
			tokenNo = hexEncode(result);
			request.getSession().setAttribute("UNIQUE_ID", tokenNo);
		} catch (NoSuchAlgorithmException ex) {
			log.error(ex.getMessage());
			System.err.println(ex);
		}
		return tokenNo;
	}

	public static String generateSecureRandomCaptcha() {
		String tokenNo = "";
		try {
			// Initialize SecureRandom
			SecureRandom prng = SecureRandom.getInstanceStrong();
			// Generate a random number
			String randomNum = String.valueOf(prng.nextInt());
			// Get its digest
			MessageDigest sha = MessageDigest.getInstance("SHA-256");
			byte[] result = sha.digest(randomNum.getBytes());
			tokenNo = hexEncode(result);
		} catch (NoSuchAlgorithmException ex) {
			log.error(ex.getMessage());
			System.err.println(ex);
		}
		return tokenNo;
	}

	private static String hexEncode(byte[] aInput) {
		StringBuilder result = new StringBuilder();
		char[] digits = { '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' };
		// char[] digits = { '1', '1', '1', '1','1', '1', '1', '1','1', '1', '1',
		// '1','1', '1', '1', '1'};

		for (int idx = 0; idx < aInput.length; ++idx) {
			byte b = aInput[idx];
			result.append(digits[(b & 0xf0) >> 4]);
			result.append(digits[b & 0x0f]);
		}
		return result.toString();
	}
}
