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
		} else {
			setError(data.error)
		}
	}

	return (
		<div>
			<Error message={error} />
			<div>
				<input
					type='email'
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<input
					type='password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button onClick={handleLogin}>Войти</button>
			</div>
		</div>
	)
}

export default LoginPage
