// Lista canonica de categorias (coincide con el enum de la API).
// Se usa como fallback cuando todavia no hay productos cargados.
export const CATEGORIES = [
	'Torta',
	'Tarta',
	'Postre',
	'Bocado',
	'Panaderia',
	'Pasteleria',
	'Salado',
	'Especialidad',
	'Festivo',
];

// Un producto trae un arreglo de categorias; lo normalizamos a array siempre
// y descartamos entradas vacias.
export const getProductCategories = (product) => {
	const raw = Array.isArray(product?.category)
		? product.category
		: product?.category
			? [product.category]
			: [];
	return raw.map((c) => (c ?? '').toString().trim()).filter(Boolean);
};
