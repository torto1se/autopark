import { useState } from 'react'
import Error from './Error'

function RegistrationPage() {
	const [full_name, setFull_name] = useState('')
	const [driver_license, setDriver_license] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const handleRegistration = async () => {
		if (!full_name || !driver_license || !phone || !email || !password) {
			setError('Все поля должны быть заполнены!')
			setTimeout(() => setError(''), 3000)
			return
		}

		const response = await fetch('http://localhost:3001/registration', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				full_name,
				driver_license,
				phone,
				email,
				password,
			}),
		})

		const data = await response.json()
		if (response.ok) {
			console.log('Успешная регистрация')
			// Редирект на страницу входа или другую после регистрации
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
			<h3 style={{ marginBottom: '20px' }}>Регистрация</h3>

			<input
				type='text'
				value={full_name}
				placeholder='ФИО'
				onChange={e => setFull_name(e.target.value)}
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
				type='text'
				value={driver_license}
				placeholder='Водительская лицензия'
				onChange={e => setDriver_license(e.target.value)}
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
				type='text'
				value={phone}
				placeholder='Телефон'
				onChange={e => setPhone(e.target.value)}
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
				type='email'
				value={email}
				placeholder='Почта'
				onChange={e => setEmail(e.target.value)}
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
				placeholder='Пароль'
				onChange={e => setPassword(e.target.value)}
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
				onClick={handleRegistration}
				style={{
					padding: '10px 20px',
					backgroundColor: '#007bff',
					color: 'white',
					border: 'none',
					borderRadius: '5px',
					cursor: 'pointer',
				}}
			>
				Зарегистрироваться
			</button>
		</div>
	)
}

export default RegistrationPage
