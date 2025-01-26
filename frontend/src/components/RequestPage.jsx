import { useState } from 'react'
import Error from './Error'

function RequestPage() {
	const [car, setCar] = useState('')
	const [data, setData] = useState('')
	const [error, setError] = useState('')

	const cars = ['Bently', 'Mercedes-Benz', 'Audi']

	const handleRequest = async () => {
		if (!car || !data) {
			setError('Все поля должны быть заполнены!')
			setTimeout(() => setError(''), 3000)
			return
		}

		const token = localStorage.getItem('token')

		const response = await fetch('http://localhost:3001/request', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ car, data }),
		})

		if (response.ok) {
			console.log('Заявка отправлена')
		} else {
			const data = await response.json()
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
				backgroundColor: '#f0f0f0',
				borderRadius: '10px',
				boxShadow: '0 0 10px rgba(0,0,0,0.1)',
			}}
		>
			<Error message={error} />
			<h3 style={{ marginBottom: '20px' }}>Отправить заявку</h3>

			<select
				value={car}
				onChange={e => setCar(e.target.value)}
				style={{
					padding: '10px',
					width: '100%',
					maxWidth: '300px',
					marginBottom: '15px',
					borderRadius: '5px',
					border: '1px solid #ccc',
				}}
			>
				<option value='' disabled selected>
					Выберите машину
				</option>
				{cars.map(car => (
					<option key={car} value={car}>
						{car}
					</option>
				))}
			</select>

			<input
				type='date'
				value={data}
				onChange={e => setData(e.target.value)}
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
				onClick={handleRequest}
				style={{
					padding: '10px 20px',
					backgroundColor: '#007bff',
					color: 'white',
					border: 'none',
					borderRadius: '5px',
					cursor: 'pointer',
				}}
			>
				Отправить
			</button>
		</div>
	)
}

export default RequestPage
