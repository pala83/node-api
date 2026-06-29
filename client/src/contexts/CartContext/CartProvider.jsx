import { useToast } from '@contexts/ToastContext/useToast';
import { useState } from 'react';
import { CartContext } from './CartContext';

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const { showToast } = useToast();

	const exists = (id) => {
		const exist = cart.some((item) => item.id === id);
		return exist;
	};

	const addItem = (item) => {
		if (exists(item.id)) {
			const updatedCart = cart.map((cartItem) => {
				if (cartItem.id === item.id) {
					return {
						...cartItem,
						quantity: cartItem.quantity + item.quantity,
					};
				} else {
					return cartItem;
				}
			});
			setCart(updatedCart);
			showToast({
				type: 'info',
				title: `Carrito actualizado`,
				text: `Se agregaron ${item.quantity} unidades más al carrito.`,
			});
			return;
		}
		setCart([...cart, item]);
		showToast({
			type: 'success',
			title: 'Agregado al carrito',
			text: `Se agregaron ${item.quantity} unidades de ${item.name} al carrito`,
		});
	};

	const deleteItem = (id) => {
		const filtered = cart.filter((item) => item.id !== id);
		setCart(filtered);
		showToast({
			type: 'info',
			title: 'Producto eliminado',
			text: 'Se eliminó el producto del carrito.',
		});
	};

	const clearCart = (showNotification = true) => {
		setCart([]);
		if (showNotification) {
			showToast({
				type: 'info',
				title: 'Carrito vacío',
				text: 'Se limpió el carrito.',
			});
		}
	};

	const getTotalItems = () => {
		const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
		return totalItems;
	};

	const totalPrice = () => {
		const totalPrice = cart.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0,
		);
		return Math.round(totalPrice * 100) / 100;
	};

	const checkout = () => {
		clearCart(false); // No mostrar notificación de carrito vacío
		showToast({
			type: 'apu',
		});
	};

	const values = {
		cart,
		addItem,
		deleteItem,
		clearCart,
		getTotalItems,
		totalPrice,
		checkout,
	};
	return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
