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
		} else {
			setError(data.error)
		}
	}

	return (
		<div>
			<Error message={error} />
			<div>
				<input
					type='text'
					value={full_name}
					placeholder='ФИО'
					onChange={e => setFull_name(e.target.value)}
				/>
				<input
					type='text'
					value={driver_license}
					placeholder='Водительскакя лицензия'
					onChange={e => setDriver_license(e.target.value)}
				/>
				<input
					type='text'
					value={phone}
					placeholder='Телефон'
					onChange={e => setPhone(e.target.value)}
				/>
				<input
					type='email'
					value={email}
					placeholder='Почта'
					onChange={e => setEmail(e.target.value)}
				/>
				<input
					type='password'
					value={password}
					placeholder='Пароль'
					onChange={e => setPassword(e.target.value)}
				/>
				<button onClick={handleRegistration}>Зарегистрировтаься</button>
			</div>
		</div>
	)
}

export default RegistrationPage
