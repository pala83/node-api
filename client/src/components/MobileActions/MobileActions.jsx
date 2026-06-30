import { Button } from '@components/Button.jsx';
import { useCartContext } from '@contexts/CartContext/useCartContext';
import { Menu, ShoppingCart } from 'lucide-react';

export const MobileActions = () => {
	const { getTotalItems } = useCartContext();

	const handleToggleSidebar = () => {
		// notify Nav to toggle its internal sidebar state
		if (typeof document !== 'undefined') {
			document.dispatchEvent(new CustomEvent('app:toggle-sidebar'));
		}
	};

	const handleOpenCart = () => {
		if (typeof document !== 'undefined') {
			document.dispatchEvent(new CustomEvent('app:toggle-cart'));
		}
	};

	return (
		<div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
			<Button
				onClick={handleOpenCart}
				variant="secondary"
				className="pointer-events-auto relative w-12 h-12 flex items-center"
				aria-label="Open cart"
			>
                <ShoppingCart className="w-7 h-7" aria-hidden="true" />
				{getTotalItems() > 0 && (
					<span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-600 rounded-full pointer-events-none">
						{getTotalItems()}
					</span>
				)}
			</Button>

			<Button
				variant="secondary"
				onClick={handleToggleSidebar}
				className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white shadow-lg sm:hidden"
				aria-label="Toggle sidebar"
			>
				<Menu className="w-7 h-7" aria-hidden="true" />
			</Button>
		</div>
	);
};

export default MobileActions;
