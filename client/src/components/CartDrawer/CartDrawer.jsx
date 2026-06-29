import { Button } from '@components/Button.jsx';
import ConfirmDialog from '@components/ConfirmDialog/ConfirmDialog';
import { useCartContext } from '@contexts/CartContext/useCartContext';
import { useToast } from '@contexts/ToastContext/useToast';
import { useEffect, useState } from 'react';

export const CartDrawer = () => {
	const [open, setOpen] = useState(false);
	const { cart, clearCart, deleteItem, totalPrice, checkout } =
		useCartContext();

	useEffect(() => {
		const onToggle = () => setOpen((v) => !v);
		const onOpen = () => setOpen(true);
		document.addEventListener('app:toggle-cart', onToggle);
		document.addEventListener('app:open-cart', onOpen);
		return () => {
			document.removeEventListener('app:toggle-cart', onToggle);
			document.removeEventListener('app:open-cart', onOpen);
		};
	}, []);

	const [confirmDeleteId, setConfirmDeleteId] = useState(null);
	const handleConfirmDelete = () => {
		if (confirmDeleteId) deleteItem(confirmDeleteId);
		setConfirmDeleteId(null);
	};
	const handleCancelDelete = () => setConfirmDeleteId(null);

	// checkout confirmation dialog state
	const [confirmCheckoutOpen, setConfirmCheckoutOpen] = useState(false);
	const [isCheckoutProcessing, setIsCheckoutProcessing] = useState(false);
	const { showToast } = useToast();

	const handleRequestCheckout = () => setConfirmCheckoutOpen(true);

	// simulated async checkout: returns a promise that resolves after delay
	const simulateCheckout = (ms = 1200) =>
		new Promise((resolve, reject) => {
			setTimeout(() => {
				// simulate occasional failure (5% chance)
				if (Math.random() < 0.05) {
					reject(new Error('Error de red. Intenta nuevamente.'));
				} else {
					resolve();
				}
			}, ms);
		});

	const handleConfirmCheckout = async () => {
		setIsCheckoutProcessing(true);
		try {
			await simulateCheckout();
			checkout();
			setConfirmCheckoutOpen(false);
		} catch (err) {
			showToast({
				type: 'danger',
				title: 'Error',
				text: err?.message ?? 'Error en checkout',
			});
		} finally {
			setIsCheckoutProcessing(false);
		}
	};

	const handleCancelCheckout = () => {
		if (isCheckoutProcessing) return; // prevent cancelling while processing
		setConfirmCheckoutOpen(false);
	};

	const close = () => setOpen(false);

	return (
		<>
			<div
				onClick={close}
				aria-hidden
				className={`fixed inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-30`}
			/>

			<aside
				className={`fixed top-0 right-0 z-40 h-full max-h-screen w-full sm:w-96 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-200 ${
					open ? 'translate-x-0' : 'translate-x-full'
				}`}
				aria-hidden={!open}
				aria-label="Cart drawer"
			>
				<div className="h-full flex flex-col">
					<div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
						<h3 className="text-lg font-semibold">Cart</h3>
						<div className="flex items-center gap-2">
							<Button variant="ghost" onClick={clearCart} className="text-sm">
								Clear
							</Button>
							<Button onClick={close} variant="ghost">
								Close
							</Button>
						</div>
					</div>

					<div className="flex-1 overflow-auto p-4">
						{cart.length === 0 ? (
							<div className="text-sm text-gray-500">
								Tu carrito está vacío.
							</div>
						) : (
							<ul className="space-y-3">
								{cart.map((item) => (
									<li
										key={item.id}
										className="flex items-start justify-between"
									>
										<div className="flex items-center gap-3">
											{item.imageUrl ? (
												<img
													src={item.imageUrl}
													alt={item.name}
													className="w-16 h-16 object-cover rounded"
												/>
											) : (
												<div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
													No image
												</div>
											)}
											<div>
												<div className="font-medium">{item.name}</div>
												<div className="text-sm text-gray-500">
													Precio: ${item.price}
												</div>
												<div className="text-sm text-gray-500">
													Unidades: {item.quantity}
												</div>
											</div>
										</div>
										<Button
											variant="danger"
											onClick={() => setConfirmDeleteId(item.id)}
											className="text-xs p-2"
											aria-label={`Eliminar ${item.name}`}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="w-5 h-5"
												viewBox="0 0 24 24"
												aria-hidden="true"
												focusable="false"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path d="M10 11v6" />
												<path d="M14 11v6" />
												<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
												<path d="M3 6h18" />
												<path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
											</svg>
										</Button>
									</li>
								))}
							</ul>
						)}
					</div>

					<div className="p-4 border-t border-gray-200 dark:border-gray-800">
						<div className="mb-3 flex items-center justify-between">
							<span className="text-sm text-gray-600">Total</span>
							<span className="text-lg font-semibold">${totalPrice()}</span>
						</div>
						<Button
							className="w-full"
							disabled={cart.length === 0}
							onClick={handleRequestCheckout}
						>
							Confirmar compra
						</Button>
					</div>
				</div>
			</aside>
			{/* confirmation dialog for delete */}
			<ConfirmDialog
				open={confirmDeleteId !== null}
				title="Confirmar eliminación"
				message="¿Eliminar este producto del carrito?"
				onConfirm={handleConfirmDelete}
				onCancel={handleCancelDelete}
			/>
			{/* checkout confirmation dialog */}
			<ConfirmDialog
				open={confirmCheckoutOpen}
				title="Confirmar compra"
				message="¿Desea finalizar la compra?"
				loading={isCheckoutProcessing}
				confirmButtonText="Comprar"
				cancelButtonText="Cancelar"
				onConfirm={handleConfirmCheckout}
				onCancel={handleCancelCheckout}
			/>
		</>
	);
};

export default CartDrawer;
