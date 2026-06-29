import { ItemDetail } from '@components/ItemDetail/ItemDetail';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const ItemDetailContainer = () => {
	const [detail, setDetail] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		setLoading(true);
		setError(null);
		const base = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE;
		fetch(`${base}/products/${id}`)
			.then((response) => {
				if (!response.ok) throw new Error('Network response was not ok');
				return response.json();
			})
			.then((product) => {
				const isNotFoundString =
					typeof product === 'string' &&
					product.toLowerCase().includes('not found');
				if (!product || isNotFoundString || !product.id)
					throw new Error('Product not found');
				setDetail(product);
			})
			.catch((error) => {
				console.error('Error fetching product details:', error);
				setError(error.message || 'Unknown error');
			})
			.finally(() => setLoading(false));
	}, [id]);

	return (
		<>
            <h1 className='text-4xl font-bold px-4 pt-10'>¡Bienvenidos a nuestra tienda!</h1>
			{loading && <p>Loading product details...</p>}
			{!loading && error && (
				<p className="text-center text-gray-500 dark:text-gray-400">
					Producto no encontrado
				</p>
			)}
			{!loading && !error && Object.keys(detail).length > 0 && (
				<ItemDetail detail={detail} />
			)}
		</>
	);
};
