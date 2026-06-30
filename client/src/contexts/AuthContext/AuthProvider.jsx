import {
	getSession,
	login as loginRequest,
	logout as logoutRequest,
} from '@services/auth';
import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
	// Rehidratamos el usuario desde la sesion persistida (si hay token vigente).
	const [user, setUser] = useState(() => getSession()?.user ?? null);

	// Si el refresh automatico falla (sesion expirada), sincronizamos el estado.
	useEffect(() => {
		const onExpired = () => setUser(null);
		window.addEventListener('auth:session-expired', onExpired);
		return () => window.removeEventListener('auth:session-expired', onExpired);
	}, []);

	// Login real contra la API: devuelve el usuario o lanza un Error con el motivo.
	const login = async (email, password) => {
		const session = await loginRequest({ email, password });
		setUser(session.user);
		return session.user;
	};

	const isLoggedIn = !!user;

	const logout = async () => {
		await logoutRequest();
		setUser(null);
		alert('Has cerrado sesión correctamente.');
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
			{children}
		</AuthContext.Provider>
	);
};
