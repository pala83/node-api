import { authFetch } from './auth';

// Base de la API REST propia (incluye el prefijo /api), configurada en VITE_API_URL.
const BASE_URL = `${import.meta.env.VITE_API_URL}/products`;

// Un unico fetch trae todos los productos; el agrupado por categoria se hace en el front.
export const getProducts = async () => {
	const res = await fetch(BASE_URL);
	if (!res.ok) {
		throw new Error('Error fetching products');
	}
	return res.json();
};

export const getProductById = async (id) => {
	const res = await fetch(`${BASE_URL}/${id}`);
	if (!res.ok) {
		throw new Error('Error fetching product');
	}
	return res.json();
};

export const createProduct = async (product) => {
	const res = await authFetch(BASE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(product),
	});
	if (!res.ok) {
		if (res.status === 401) {
			throw new Error('Tu sesión expiró, volvé a iniciar sesión');
		}
		throw new Error('Error creating product');
	}
	return res.json();
};

export const deleteProduct = async (productId) => {
	const deleteConfirm = confirm(
		'¿Desea erradicar de la existencia a este producto? Esta acción no se puede deshacer.',
	);
	if (!deleteConfirm) return null;

	const confirmDeleteConfirm = confirm(
		'¿Usted es consciente de la accion que esta a punto de realizar?',
	);
	if (!confirmDeleteConfirm) return null;

	const res = await authFetch(`${BASE_URL}/${productId}`, {
		method: 'DELETE',
	});
	if (!res.ok) {
		if (res.status === 401) {
			throw new Error('Tu sesión expiró, volvé a iniciar sesión');
		}
		throw new Error('Error deleting product');
	}
	return res.json();
};
