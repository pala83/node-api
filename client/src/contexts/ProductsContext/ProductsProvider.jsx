import { getProducts } from '@services/products';
import { getProductCategories } from '@utils/categories';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ProductsContext } from './ProductsContext';

export const ProductsProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	// Un unico fetch de todos los productos, compartido por el Nav y el Home.
	const fetchProducts = useCallback(() => {
		setLoading(true);
		return getProducts()
			.then((data) => setProducts(Array.isArray(data) ? data : []))
			.catch((error) => console.error('Error fetching products:', error))
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const removeProduct = useCallback((id) => {
		setProducts((prev) => prev.filter((p) => p.id !== id));
	}, []);

	// Categorias distintas presentes en los productos, ordenadas alfabeticamente.
	const categories = useMemo(() => {
		const set = new Set();
		for (const product of products) {
			for (const cat of getProductCategories(product)) set.add(cat);
		}
		return [...set].sort((a, b) => a.localeCompare(b));
	}, [products]);

	const value = useMemo(
		() => ({ products, categories, loading, fetchProducts, removeProduct }),
		[products, categories, loading, fetchProducts, removeProduct],
	);

	return (
		<ProductsContext.Provider value={value}>
			{children}
		</ProductsContext.Provider>
	);
};
