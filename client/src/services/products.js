const base = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE;
const BASE_URL = `${base}/products`;

export const createProduct = async (product) => {
	const res = await fetch(BASE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(product),
	});
	if (!res.ok) {
		throw new Error('Error creating product');
	}
	const data = await res.json();
	return data;
};

// Hago un GET de todo y si quiero filtrar lo hago en el front
export const getProducts = async () => {
	const res = await fetch(BASE_URL);
	if (!res.ok) {
		throw new Error('Error fetching products');
	}
	const data = await res.json();
	return data;
};

export const deleteProduct = async (productId) => {
    const deleteConfirm = confirm('¿Desea erradicar de la existencia a este producto? Esta acción no se puede deshacer.');
    if (deleteConfirm) {
        const confirmDeleteConfirm = confirm('¿Usted es consciente de la accion que esta a punto de realizar?');
        if (confirmDeleteConfirm) {
            const res = await fetch(`${BASE_URL}/${productId}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                throw new Error('Error deleting product');
            }
            const data = await res.json();
            return data;
        }
    }
    return null;
};

// Esto lo uso si de repente tengo una barbaridad de productos y me vale la pena filtrar

//export const getProducts = async (category) => {
//    let url = BASE_URL;
//    if (category) {
//        url += `?category=${category}`;
//    }
//    const res = await fetch(url);
//    if(!res.ok) {
//        throw new Error('Error fetching products');
//    }
//    const data = await res.json();
//    return data;
//}

// PROXIMAMENTE
// TODO: Metodo de get con Paginado, en proceso de codeacion 💻️ 👨‍💻