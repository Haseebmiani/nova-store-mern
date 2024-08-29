import redisClient from "../config/redisConfig.js";

export function setRefreshToken(userId, refreshToken) {
	redisClient.SETEX(`refreshToken:${userId}`, 30 * 24 * 60 * 60, refreshToken);
}

export function getRefreshToken(userId) {
	return new Promise((resolve, reject) => {
		redisClient.GET(`refreshToken:${userId}`, (err, refreshToken) => {
			if (err) reject(err);
			resolve(refreshToken);
		});
	});
}

export function removeRefreshToken(userId) {
	redisClient.DEL(`refreshToken:${userId}`);
}
