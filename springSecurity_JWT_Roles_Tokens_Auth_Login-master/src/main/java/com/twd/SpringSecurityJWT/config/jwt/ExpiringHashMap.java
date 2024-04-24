package com.twd.SpringSecurityJWT.config.jwt;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class ExpiringHashMap<K, V> {
	private final Map<K, ExpiringValue<V>> map = new HashMap<>();
	private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();

	public ExpiringHashMap() {
		// Schedule a task to clean up expired entries every minute
		scheduleExpirationCheck();
	}

	public void put(K key, V value, long expirationTime, TimeUnit timeUnit) {
		ExpiringValue<V> expiringValue = new ExpiringValue<>(value, expirationTime, timeUnit);
		map.put(key, expiringValue);
	}

	public V get(K key) {
		ExpiringValue<V> expiringValue = map.get(key);
		return expiringValue != null ? expiringValue.getValue() : null;
	}

	private void scheduleExpirationCheck() {
		scheduler.scheduleAtFixedRate(() -> {
			removeExpiredEntries();
		}, 0, 1, TimeUnit.MINUTES); // Check for expired entries every minute
	}

	public void removeExpiredEntries() {
		long currentTime = System.currentTimeMillis();
		map.entrySet().removeIf(entry -> entry.getValue().isExpired(currentTime));
	}

	public boolean containsKey(K key) {
		return map.containsKey(key);
	}

	private static class ExpiringValue<V> {
		private final V value;
		private final long expirationTimeMillis;

		public ExpiringValue(V value, long expirationTime, TimeUnit timeUnit) {
			this.value = value;
			this.expirationTimeMillis = System.currentTimeMillis() + timeUnit.toMillis(expirationTime);
		}

		public V getValue() {
			return value;
		}

		public boolean isExpired(long currentTimeMillis) {
			return currentTimeMillis >= expirationTimeMillis;
		}
	}
}
