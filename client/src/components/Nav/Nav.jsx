import { Button } from '@components/Button';
import { useAuthContext } from '@contexts/AuthContext/useAuthContext';
import { useProducts } from '@contexts/ProductsContext/useProducts';
import {
	Cake,
	CakeSlice,
	Cookie,
	Croissant,
	Donut,
	House,
	IceCreamBowl,
	LockKeyhole,
	Menu,
	PartyPopper,
	Sandwich,
	Sparkles,
	Tag,
} from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Icono representativo por categoria (clave en minusculas).
const CATEGORY_ICONS = {
	torta: Cake,
	tarta: CakeSlice,
	postre: IceCreamBowl,
	bocado: Cookie,
	panaderia: Croissant,
	pasteleria: Donut,
	salado: Sandwich,
	especialidad: Sparkles,
	festivo: PartyPopper,
};

const getCategoryIcon = (category) =>
	CATEGORY_ICONS[category.toLowerCase()] ?? Tag;

const ICON_CLASS =
	'shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white';

export const Nav = () => {
    const { isLoggedIn, logout } = useAuthContext();
	const { categories } = useProducts();
	const location = useLocation();
	const [open, setOpen] = useState(false);
	const sidebarId = useId();
	const isAdminRoute = location.pathname.startsWith('/admin');

    const handleToggle = () => setOpen((v) => !v);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		const onToggle = () => setOpen((v) => !v);
		document.addEventListener('app:toggle-sidebar', onToggle);
		return () => document.removeEventListener('app:toggle-sidebar', onToggle);
	}, []);

	return (
		<>
            {isAdminRoute && (

                <Button
                    aria-controls={sidebarId}
                    aria-expanded={open}
                    onClick={handleToggle}
                    className="inline-flex items-center m-5 sm:hidden"
                >
                    <span className="sr-only">Open sidebar</span>
                    <Menu className="w-6 h-6" aria-hidden="true" />
                </Button>
            )}
			{open && (
				<div
					onClick={handleClose}
					aria-hidden
					className="fixed inset-0 z-30 bg-black/50 sm:hidden"
				/>
			)}

			<aside
				id={sidebarId}
				className={`fixed top-0 left-0 z-40 w-64 h-full max-h-screen transition-transform ${
					open ? 'translate-x-0' : '-translate-x-full'
				} sm:translate-x-0`}
				aria-label="Sidebar"
			>
				<div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col">
					<ul className="space-y-2 font-medium flex-1">
						<li>
							<Link
								to="/"
								onClick={handleClose}
								className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
							>
								<House className={ICON_CLASS} aria-hidden="true" />
								<span className="ms-3">Home</span>
							</Link>
						</li>
						{categories.map((category) => {
							const Icon = getCategoryIcon(category);
							return (
								<li key={category}>
									<Link
										to={`/category/${category.toLowerCase()}`}
										onClick={handleClose}
										className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
									>
										<Icon className={ICON_CLASS} aria-hidden="true" />
										<span className="flex-1 ms-3 whitespace-nowrap capitalize">
											{category}
										</span>
									</Link>
								</li>
							);
						})}
						<li>
							<Link
								to="/admin"
								onClick={handleClose}
								className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
							>
								<LockKeyhole className={ICON_CLASS} aria-hidden="true" />
								<span className="flex-1 ms-3 whitespace-nowrap">Admin</span>
							</Link>
						</li>
					</ul>

					{isLoggedIn && (
						<Button
							variant="danger"
							onClick={logout}
							className="w-full py-3"
						>
							Cerrar Sesión
						</Button>
					)}
				</div>
			</aside>
		</>
	);
};
