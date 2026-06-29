import { ToastContainer } from '@components/Toast/Toast';
import { useCallback, useMemo, useState } from 'react';
import { ToastContext } from './ToastContext';

function genId() {
	if (typeof crypto !== 'undefined' && crypto.randomUUID)
		return crypto.randomUUID();
	return `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export const ToastProvider = ({ children }) => {
	const [toasts, setToasts] = useState([]);

	const dismissToast = useCallback((id) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}, []);

	const showToast = useCallback(
		({ type = 'info', title, text, duration = 10000 }) => {
			const id = genId();
			setToasts((prev) => [...prev, { id, type, title, text, duration }]);
			return id;
		},
		[],
	);

	const value = useMemo(
		() => ({ showToast, dismissToast }),
		[showToast, dismissToast],
	);

	return (
		<ToastContext.Provider value={value}>
			{children}
			<ToastContainer toasts={toasts} onRemove={dismissToast} />
		</ToastContext.Provider>
	);
};
