import { ItemList } from '@components/ItemList/ItemList';
import { useProducts } from '@contexts/ProductsContext/useProducts';
import { getProductCategories } from '@utils/categories';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

const normalize = (s) => (s ?? '').toString().trim().toLowerCase();

export const ItemListContainer = () => {
	const { products, removeProduct } = useProducts();
	const { category } = useParams() ?? {};

	// En el Home (sin categoria) se muestran todos los productos. Si la ruta trae
	// :category, se filtran los productos cuya categoria coincide (un producto
	// puede tener varias categorias).
	const list = useMemo(() => {
		const routeCategory = normalize(category);
		if (!routeCategory) return products;
		return products.filter((product) =>
			getProductCategories(product).some(
				(cat) => normalize(cat) === routeCategory,
			),
		);
	}, [products, category]);

	return (
		<>
			<h1 className="text-4xl font-bold px-4 pt-10 capitalize">
				{category ? category : '¡Bienvenidos a nuestra tienda!'}
			</h1>
			<ItemList list={list} onProductDeleted={removeProduct} />
		</>
	);
};
