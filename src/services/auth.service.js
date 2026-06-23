import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository.js';

const makeError = (message, statusCode) => Object.assign(new Error(message), { statusCode });

const signAccess = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

const signRefresh = (payload) =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

export const authService = {
  async register({ name, email, password }) {
    const existing = await userRepository.findByEmail(email);
    if (existing) throw makeError('Email already in use', 409);

    const hashedPassword = await argon2.hash(password);
    const user = await userRepository.create({ name, email, password: hashedPassword });

    const payload = { id: user.id, email: user.email };
    const accessToken = signAccess(payload);
    const refreshToken = signRefresh(payload);

    await userRepository.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken, user: { id: user.id, name: user.name, email: user.email } };
  },

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw makeError('Invalid credentials', 401);

    const valid = await argon2.verify(user.password, password);
    if (!valid) throw makeError('Invalid credentials', 401);

    const payload = { id: user.id, email: user.email };
    const accessToken = signAccess(payload);
    const refreshToken = signRefresh(payload);

    await userRepository.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken, user: { id: user.id, name: user.name, email: user.email } };
  },

  async refresh(token) {
    if (!token) throw makeError('Refresh token required', 401);

    const stored = await userRepository.findRefreshToken(token);
    if (!stored) throw makeError('Invalid refresh token', 403);

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch {
      await userRepository.deleteRefreshToken(token);
      throw makeError('Refresh token expired or invalid', 403);
    }

    await userRepository.deleteRefreshToken(token);

    const newPayload = { id: payload.id, email: payload.email };
    const accessToken = signAccess(newPayload);
    const refreshToken = signRefresh(newPayload);

    await userRepository.saveRefreshToken(payload.id, refreshToken);

    return { accessToken, refreshToken };
  },

  async logout(token) {
    if (!token) throw makeError('Refresh token required', 401);
    await userRepository.deleteRefreshToken(token);
  },
};
