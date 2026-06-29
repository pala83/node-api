import { ItemList } from '@components/ItemList/ItemList';
import { getProducts } from '@services/products';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const ItemListContainer = () => {
	const [products, setProducts] = useState([]);
	const { category } = useParams() ?? {};
	
	useEffect(() => {
		getProducts()
			.then((data) => setProducts(data))
			.catch((error) => console.error('Error fetching products:', error));
	}, []);

	const handleProductDeleted = (deletedProductId) => {
		setProducts((prevProducts) => 
			prevProducts.filter((p) => p.id !== deletedProductId)
		);
	};

	// esto porque los nombres de categorias en el json no son consistentes
	const normalize = (s) => (s ?? '').toString().trim().toLowerCase();
	// esto porque puse las categorias en plural y me da fiaca acomodarlas
	const toSingular = (s) => (s.endsWith('s') ? s.slice(0, -1) : s);
	const routeCategory = toSingular(normalize(category));
	// esto porque no quiero volver a hacer la llamada a la api
	const list = routeCategory
		? products.filter(
				(p) => toSingular(normalize(p.category)) === routeCategory,
			)
		: products;

	return (
		<>
			<h1 className='text-4xl font-bold px-4 pt-10'>¡Bienvenidos a nuestra tienda!</h1>
			<ItemList list={list} onProductDeleted={handleProductDeleted} />
		</>
	);
};
