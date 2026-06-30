import { Button } from '@components/Button';
import { InputForm } from '@components/InputForm';
import { useAuthContext } from '@contexts/AuthContext/useAuthContext';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export const Login = () => {
	const [userForm, setUserForm] = useState({ email: '', password: '' });
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const { user, login } = useAuthContext();

	const navigate = useNavigate();

	if (user) {
		return <Navigate to="/admin/alta-productos" replace />;
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserForm({ ...userForm, [name]: value });
	};

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);
		try {
			await login(userForm.email, userForm.password);
			navigate('/admin/alta-productos');
		} catch (err) {
			setError(err.message);
			setUserForm((prev) => ({ ...prev, password: '' }));
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className="space-y-4 w-md px-5" onSubmit={handleOnSubmit}>
			<InputForm
				label="Email:"
				type="email"
				name="email"
				value={userForm.email}
				onChange={handleChange}
				required
			/>
			<InputForm
				label="Contraseña:"
				type="password"
				name="password"
				value={userForm.password}
				onChange={handleChange}
				required
			/>
			{error && <small className="block pl-0.5 text-red-500">{error}</small>}
			<Button
				type="submit"
				disabled={loading || !userForm.email || !userForm.password}
			>
				{loading ? 'Ingresando...' : 'Iniciar Sesión'}
			</Button>
		</form>
	);
};
