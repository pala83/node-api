import { Button } from '@components/Button.jsx';
import { useState } from 'react';

export const Count = ({ btnText, stock, initial, onConfirm }) => {
	const [count, setCount] = useState(initial);

	const increment = () => {
		console.log('stock:', stock, 'count:', count);
		if (count < stock) {
			setCount((value) => value + 1);
		}
	};

	const decrement = () => {
		if (count > 1) {
			setCount((value) => value - 1);
		}
	};

	const confirm = () => {
		if (count > 0 && count <= stock) {
			onConfirm(count);
		}
	};

	return (
		<div className="flex flex-wrap justify-end sm:justify-start sm:flex-nowrap w-full gap-2">
			<div className="h-10 border border-gray-600 dark:border-gray-500 rounded-md overflow-hidden divide-x divide-gray-600 dark:divide-gray-500 bg-transparent inline-flex">
				<Button
					variant="counter"
					onClick={decrement}
					aria-label="Decrease quantity"
					disabled={count <= 1}
				>
					-
				</Button>
				<div
					className="w-15 sm:w-20 flex items-center justify-center text-base font-semibold bg-gray-900 dark:bg-gray-800"
					aria-live="polite"
					aria-atomic="true"
				>
					{count}
				</div>
				<Button
					variant="counter"
					onClick={increment}
					aria-label="Increase quantity"
					disabled={count >= stock}
				>
					+
				</Button>
			</div>
			<Button className="w-full" onClick={confirm} disabled={stock === 0}>
				{btnText}
			</Button>
		</div>
	);
};
