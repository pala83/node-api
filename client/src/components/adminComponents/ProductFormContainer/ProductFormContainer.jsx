import { ProductFormUI } from '@components/adminComponents/ProductFormUI/ProductFormUI';
import { useToast } from '@contexts/ToastContext/useToast';
import { createProduct } from '@services/products';
import { uploadToImgbb } from '@services/uploadImage';
import { validateProducts } from '@utils/validateProducts';
import { useState } from 'react';

export const ProductFormContainer = () => {
	const [loading, setLoading] = useState(false);
	const [file, setFile] = useState(null);
	const [errors, setErrors] = useState({});
    const { showToast } = useToast();
	const [product, setProduct] = useState({
		name: '',
		price: '',
		category: '',
		description: '',
		stock: '',
	});

	const handleChange = async (e) => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value });
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
            })
			setProduct({
				name: '',
				price: '',
				category: '',
				description: '',
				stock: '',
			});
			setFile(null);
		} catch (err) {
			setErrors({ general: err.message });
		} finally {
			setLoading(false);
		}
	};

	return (
		<ProductFormUI
			product={product}
			errors={errors}
			onChange={handleChange}
			onSubmit={handleSubmit}
			onFileChange={setFile}
			loading={loading}
		/>
	);
};
