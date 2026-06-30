import { ProductFormUI } from '@components/adminComponents/ProductFormUI/ProductFormUI';
import { useProducts } from '@contexts/ProductsContext/useProducts';
import { useToast } from '@contexts/ToastContext/useToast';
import { createProduct } from '@services/products';
import { uploadToImgbb } from '@services/uploadImage';
import { CATEGORIES } from '@utils/categories';
import { validateProducts } from '@utils/validateProducts';
import { useState } from 'react';

const EMPTY_PRODUCT = {
	name: '',
	price: '',
	category: [],
	description: '',
	stock: '',
};

// Genera un SKU simple a partir del nombre (la API lo exige y debe ser unico).
const generateSku = (name) =>
	`${name
		.trim()
		.toUpperCase()
		.replace(/[^A-Z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 12)}-${Date.now().toString().slice(-6)}`;

export const ProductFormContainer = () => {
	const [loading, setLoading] = useState(false);
	const [file, setFile] = useState(null);
	const [errors, setErrors] = useState({});
	const { showToast } = useToast();
	const { categories, fetchProducts } = useProducts();
	const [product, setProduct] = useState(EMPTY_PRODUCT);

	// Categorias disponibles: las existentes en los productos; si todavia no hay,
	// caemos en la lista canonica.
	const availableCategories = categories.length ? categories : CATEGORIES;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProduct((prev) => ({ ...prev, [name]: value }));
	};

	// Multi-seleccion: alterna una categoria dentro del arreglo product.category.
	const handleCategoryToggle = (category) => {
		setProduct((prev) => ({
			...prev,
			category: prev.category.includes(category)
				? prev.category.filter((c) => c !== category)
				: [...prev.category, category],
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors({});
		setLoading(true);

		const newErrors = validateProducts({ ...product, file });
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			setLoading(false);
			return;
		}

		try {
			const imageUrl = await uploadToImgbb(file);
			const productData = {
				...product,
				sku: generateSku(product.name),
				price: Number(product.price),
				stock: product.stock ? Number(product.stock) : 1,
				reviews: 0,
				imageUrl,
			};

			await createProduct(productData);
			showToast({
				type: 'success',
				title: 'Producto creado',
				text: `Bienvenido ${product.name} 🫂, ahora formas parte de nuestro catálogo.`,
			});
			setProduct(EMPTY_PRODUCT);
			setFile(null);
			// Refrescamos el catalogo para que el nuevo producto y sus categorias
			// aparezcan en el Home y el Nav.
			fetchProducts();
		} catch (err) {
			setErrors({ general: err.message });
			showToast({
				type: 'error',
				title: 'No se pudo guardar el producto',
				text: err.message,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<ProductFormUI
			product={product}
			errors={errors}
			categories={availableCategories}
			onChange={handleChange}
			onCategoryToggle={handleCategoryToggle}
			onSubmit={handleSubmit}
			onFileChange={setFile}
			loading={loading}
		/>
	);
};
