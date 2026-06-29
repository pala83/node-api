import { Button } from '@components/Button';
import { InputForm } from '@components/InputForm';
import { useAuthContext } from '@contexts/AuthContext/useAuthContext';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export const Login = () => {
	const [userForm, setUserForm] = useState({ name: '', password: '' });

	const { user, login } = useAuthContext();

	const navigate = useNavigate();

	if (user) {
		return <Navigate to="/admin/alta-productos" replace />;
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserForm({ ...userForm, [name]: value });
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		const success = login(userForm.name, userForm.password);
		if (success) {
			navigate('/admin/alta-productos');
		} else {
			alert('Credenciales inválidas');
			setUserForm({ name: '', password: '' });
		}
	};

	return (
		<form className='space-y-4 w-md px-5' onSubmit={handleOnSubmit}>
			<InputForm
				label="Nombre:"
				name="name"
				value={userForm.name}
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
			<Button type="submit" disabled={!userForm.name || !userForm.password}>
				Iniciar Sesión
			</Button>
		</form>
	);
};
