import { ProductFormContainer } from '@components/adminComponents/ProductFormContainer/ProductFormContainer';
import CartDrawer from '@components/CartDrawer/CartDrawer';
import { ItemDetailContainer } from '@components/ItemDetailContainer/ItemDetailContainer';
import { ItemListContainer } from '@components/ItemListContainer/ItemListContainer';
import { CartProvider } from '@contexts/CartContext/CartProvider';
import { ToastProvider } from '@contexts/ToastContext/ToastProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { ProtectedRouts } from '@components/ProtectedRouts/ProtectedRouts';
import { Login } from '@components/Login/Login';
import { Nav } from '@components/Nav/Nav';

function App() {
	return (
		<BrowserRouter>
			<ToastProvider>
				<CartProvider>
                    <Nav />
					<Routes>
						<Route element={<MainLayout />}>
							<Route path="/" element={<ItemListContainer />} />
							<Route
								path="/category/:category"
								element={<ItemListContainer />}
							/>
							<Route path="/detail/:id" element={<ItemDetailContainer />} />
							<Route path="*" element={<h2>404 Not Found</h2>} />
						</Route>
						<Route path="/admin" element={<AdminLayout />}>
							<Route index element={<Login />} />
							<Route
								path="alta-productos"
								element={
									<ProtectedRouts>
										<ProductFormContainer />
									</ProtectedRouts>
								}
							/>
							<Route path="/admin" element={<ProductFormContainer />} />
						</Route>
					</Routes>
					<CartDrawer />
				</CartProvider>
			</ToastProvider>
		</BrowserRouter>
	);
}

export default App;
