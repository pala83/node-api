const categorys = ['dulces', 'salados'];

export const validateProducts = (products, fileRequired = true) => {
	const errors = {};
	if (!products.name.trim()) {
		errors.name = 'El nombre es obligatorio';
	}
	if (
		!products.price ||
		Number.isNaN(products.price) ||
		Number(products.price) <= 0
	) {
		errors.price = 'El precio es obligatorio y debe ser un número mayor a cero';
	}
	if (!products.description.trim()) {
		errors.description = 'La descripción es obligatoria';
	}
	if (!products.category.trim()) {
		errors.category = 'La categoría es obligatoria';
	}

	if (
		!products.category.trim() ||
		!categorys.includes(products.category.toLowerCase())
	) {
		errors.category = `La categoría debe ser una de las siguientes: ${categorys.join(', ')}`;
	}
	if (
		Number.isNaN(products.reviews) ||
		Number(products.reviews) < 0 ||
		Number(products.reviews) > 5
	) {
		errors.reviews = 'Las reseñas deben ser un número entre 0 y 5';
	}
	if (Number.isNaN(products.stock) || Number(products.stock) <= 0) {
		errors.stock = 'El stock debe ser un número mayor o igual a 1';
	}

	if (fileRequired && !products.file) {
		errors.imageUrl = 'La imagen es obligatoria';
	}

	return errors;
};
