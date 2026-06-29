import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

const typeStyles = {
	success: {
		accent: 'border-green-500',
		icon: (
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="currentColor"
				className="text-green-400"
				aria-hidden="true"
				focusable="false"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.172 7.707 8.879A1 1 0 106.293 10.293l2 2a1 1 0 001.414 0l4-4z"
				/>
			</svg>
		),
	},
	warning: {
		accent: 'border-yellow-500',
		icon: (
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="currentColor"
				className="text-yellow-400"
				aria-hidden="true"
				focusable="false"
			>
				<path d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.518 11.59c.75 1.334-.213 2.986-1.742 2.986H3.48c-1.53 0-2.492-1.652-1.742-2.987L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V7a1 1 0 112 0v4a1 1 0 01-1 1z" />
			</svg>
		),
	},
	info: {
		accent: 'border-blue-500',
		icon: (
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="currentColor"
				className="text-blue-400"
				aria-hidden="true"
				focusable="false"
			>
				<path d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-8-4a1 1 0 100 2 1 1 0 000-2zm-1 4a1 1 0 000 2h1v3a1 1 0 102 0v-4a1 1 0 00-1-1H9z" />
			</svg>
		),
	},
	danger: {
		accent: 'border-red-500',
		icon: (
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="currentColor"
				className="text-red-400"
				aria-hidden="true"
				focusable="false"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M10 18a8 8 0 100-16 8 8 0 000 16zM7.293 7.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 111.414 1.414L11.414 10l1.293 1.293a1 1 0 11-1.414 1.414L10 11.414l-1.293 1.293a1 1 0 11-1.414-1.414L8.586 10 7.293 8.707a1 1 0 010-1.414z"
				/>
			</svg>
		),
	},
	apu: {
		accent: 'border-orange-500',
		icon: (
			<div className="w-20 h-30 overflow-hidden rounded-t-lg">
				<img
					src="/apu.png"
					alt="Apu"
					className="w-full h-30 object-cover object-top"
				/>
			</div>
		),
	},
};

function ToastItem({
	id,
	type = 'info',
	title,
	text,
	duration = 10000,
	onRemove,
}) {
	const [visible, setVisible] = useState(false);

	const startDismiss = useCallback(() => {
		setVisible(false);
		setTimeout(() => onRemove(id), 200);
	}, [id, onRemove]);

	useEffect(() => {
		const raf = requestAnimationFrame(() => setVisible(true));
		const timer = setTimeout(() => startDismiss(), duration);
		return () => {
			cancelAnimationFrame(raf);
			clearTimeout(timer);
		};
	}, [duration, startDismiss]);

	const { accent, icon } = typeStyles[type] ?? typeStyles.info;
	
	// Mensaje especial para Apu
	const displayTitle = type === 'apu' ? 'Gracias, vuelva prontos' : title;
	const displayText = type === 'apu' ? '' : text;

	return (
		<button
			type="button"
			onClick={startDismiss}
			className={[
				'pointer-events-auto w-80 max-w-[90vw] text-left rounded-lg border border-gray-700 bg-gray-900 text-white shadow-lg',
				'pl-3 pr-4 py-3 flex items-start gap-3 relative',
				'transition-all duration-200 ease-out',
				visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
				accent,
			].join(' ')}
		>
			<div className="mt-0.5">{icon}</div>
			<div className="flex-1">
				{displayTitle && (
					<div className="text-sm font-semibold leading-5 pt-3">{displayTitle}</div>
				)}
				{displayText && <div className="prose prose-invert">{displayText}</div>}
				<div className="mt-1 text-[11px] opacity-60">Click para cerrar</div>
			</div>
		</button>
	);
}

export function ToastContainer({ toasts, onRemove }) {
	const portalEl = useMemo(() => document.body, []);
	if (!portalEl) return null;
	return createPortal(
		<div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
			{toasts.map((t) => (
				<ToastItem key={t.id} {...t} onRemove={onRemove} />
			))}
		</div>,
		portalEl,
	);
}
