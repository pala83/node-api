import { Button } from '@components/Button.jsx';
import { useCartContext } from '@contexts/CartContext/useCartContext';

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
                {/* 
				<svg
					className="w-10 h-10"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					focusable="false"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6m5-6v6m4-6v6m1-10h.01"
					/>
				</svg>
                 */}
                <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-label='true'
                    focusable="false"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <title>Shopping Cart</title>
                    <circle cx="8" cy="21" r="1"/>
                    <circle cx="19" cy="21" r="1"/>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
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
				<svg
					className="w-10 h-10"
					viewBox="0 0 20 20"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					focusable="false"
				>
					<path
						clipRule="evenodd"
						fillRule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
					/>
				</svg>
			</Button>
		</div>
	);
};

export default MobileActions;
