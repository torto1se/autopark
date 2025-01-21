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
		}
	}

	return (
		<div>
			<Error message={error} />
			<div>
				<select
					name=''
					id=''
					value={car}
					onChange={e => setCar(e.target.value)}
				>
					<option value='' disabled selected>
						Выберите машину
					</option>
					{cars.map(cars => (
						<option key={cars} value={car.mark}>
							{cars}
						</option>
					))}
				</select>
				<input
					type='date'
					value={data}
					onChange={e => setData(e.target.value)}
				/>
				<button onClick={handleRequest}>Отправить</button>
			</div>
		</div>
	)
}

export default RequestPage
