import { Count } from '@components/Count/Count';
import { Item } from '@components/Item/Item';
import { useCartContext } from '@contexts/CartContext/useCartContext';

export const ItemDetail = ({ detail }) => {
	const { addItem } = useCartContext();

	const handleAddToCart = (quantity) => {
		addItem({ ...detail, quantity });
	};

	return (
    <div className='px-4 py-6'>
        <Item {...detail}>
            <Count
                btnText="Add to Cart"
                stock={detail.stock}
                initial={1}
                onConfirm={handleAddToCart}
            ></Count>
        </Item>
    </div>
	);
};
