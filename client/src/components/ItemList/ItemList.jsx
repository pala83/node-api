import { Item } from '@components/Item/Item';
import { Link } from 'react-router-dom';

export const ItemList = ({ list, onProductDeleted }) => {
	return (
		<div className="w-full px-4 py-6">
			{list.length ? (
				<div className="grid grid-cols-1 justify-items-stretch sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{list.map((product) => (
						<Link
							key={product.id}
							to={`/detail/${product.id}`}
							className="block"
						>
							<Item {...product} onDeleted={onProductDeleted} />
						</Link>
					))}
				</div>
			) : (
				<p className="text-center text-gray-500">
					Si usted llego a leer esto significa que su internet es una desgracia, tenga paciencia y espere, los productos apareceran antes de que termine de leer esto 😄 
				</p>
			)}
		</div>
	);
};
