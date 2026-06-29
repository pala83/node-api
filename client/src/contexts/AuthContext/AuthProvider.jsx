import { useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		const saved = sessionStorage.getItem('authUser');
		if (saved) {
			return JSON.parse(saved);
		}
		return null;
	});

	const login = (name, password) => {
		if (name === 'admin' && password === '1234') {
			const session = { name };
			setUser(session);
			sessionStorage.setItem('authUser', JSON.stringify(session));
			return true;
		}
		return false;
	};

    const isLoggedIn = !!user;

	const logout = () => {
		sessionStorage.removeItem('authUser');
		setUser(null);
		alert('Has cerrado sesión correctamente.');
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
			{children}
		</AuthContext.Provider>
	);
};
