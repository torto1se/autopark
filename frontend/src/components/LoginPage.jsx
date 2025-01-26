import { useState } from 'react'
import Error from './Error'

function LoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const handleLogin = async () => {
		if (!email || !password) {
			setError('Все поля должны быть заполнены!')
			setTimeout(() => setError(''), 3000)
			return
		}

		const response = await fetch('http://localhost:3001/login', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		})

		const data = await response.json()

		if (response.ok) {
			localStorage.setItem('token', data.token)
			console.log('Вы успешно вошли!', data.token)
			// Редирект на главную страницу или другую после входа
		} else {
			setError(data.error)
		}
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '20px',
				borderRadius: '10px',
				boxShadow: '0 0 10px rgba(0,0,0,0.1)',
			}}
		>
			<Error message={error} />
			<h3 style={{ marginBottom: '20px' }}>Вход в систему</h3>

			<input
				type='email'
				value={email}
				onChange={e => setEmail(e.target.value)}
				placeholder='Электронная почта'
				style={{
					padding: '10px',
					width: '100%',
					maxWidth: '300px',
					marginBottom: '15px',
					borderRadius: '5px',
					border: '1px solid #ccc',
				}}
			/>

			<input
				type='password'
				value={password}
				onChange={e => setPassword(e.target.value)}
				placeholder='Пароль'
				style={{
					padding: '10px',
					width: '100%',
					maxWidth: '300px',
					marginBottom: '15px',
					borderRadius: '5px',
					border: '1px solid #ccc',
				}}
			/>

			<button
				onClick={handleLogin}
				style={{
					padding: '10px 20px',
					backgroundColor: '#007bff',
					color: 'white',
					border: 'none',
					borderRadius: '5px',
					cursor: 'pointer',
				}}
			>
				Войти
			</button>
		</div>
	)
}

export default LoginPage
