const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;
const STORAGE_KEY = 'authSession';

// La sesion completa { token, refreshToken, user } se guarda en sessionStorage.
export const getSession = () => {
	const raw = sessionStorage.getItem(STORAGE_KEY);
	return raw ? JSON.parse(raw) : null;
};

export const getAccessToken = () => getSession()?.token ?? null;

const saveSession = (session) => {
	sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
};

const clearSession = () => {
	sessionStorage.removeItem(STORAGE_KEY);
};

export const login = async ({ email, password }) => {
	const res = await fetch(`${BASE_URL}/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	});

	if (!res.ok) {
		if (res.status === 401) throw new Error('Credenciales inválidas');
		if (res.status === 400) throw new Error('Email o contraseña inválidos');
		throw new Error('No se pudo iniciar sesión, intente más tarde');
	}

	const session = await res.json(); // { token, refreshToken, user }
	saveSession(session);
	return session;
};

// Evita refrescos en paralelo: si ya hay uno en curso, todas las requests esperan
// el mismo (el refresh token rota, usarlo dos veces daría 403).
let refreshPromise = null;

export const refresh = async () => {
	if (refreshPromise) return refreshPromise;

	refreshPromise = (async () => {
		const session = getSession();
		if (!session?.refreshToken) throw new Error('No hay sesión activa');

		const res = await fetch(`${BASE_URL}/refresh`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ refreshToken: session.refreshToken }),
		});

		if (!res.ok) {
			// El refresh token venció o es inválido: cerramos sesión.
			clearSession();
			window.dispatchEvent(new Event('auth:session-expired'));
			throw new Error('Sesión expirada');
		}

		const data = await res.json(); // { token, refreshToken }
		const updated = { ...session, ...data };
		saveSession(updated);
		return updated.token;
	})();

	try {
		return await refreshPromise;
	} finally {
		refreshPromise = null;
	}
};

// fetch con Authorization. Si la API responde 401, intenta refrescar el token
// una vez y reintenta la request. Si el refresh falla, devuelve el 401 original.
export const authFetch = async (url, options = {}) => {
	const withAuth = (token) => ({
		...options,
		headers: {
			...(options.headers ?? {}),
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
	});

	const res = await fetch(url, withAuth(getAccessToken()));
	if (res.status !== 401) return res;

	let newToken;
	try {
		newToken = await refresh();
	} catch {
		return res; // refresh fallido; devolvemos el 401 original
	}
	return fetch(url, withAuth(newToken));
};

export const logout = async () => {
	const session = getSession();
	// Invalidamos el refresh token en la API (best-effort); igual limpiamos local.
	if (session?.refreshToken) {
		try {
			await fetch(`${BASE_URL}/logout`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ refreshToken: session.refreshToken }),
			});
		} catch {
			// ignorado a proposito
		}
	}
	clearSession();
};
