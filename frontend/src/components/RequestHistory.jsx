import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Error from './Error'

function RequestHistory() {
	const [request, setRequest] = useState([])
	const [error, setError] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) {
			navigate('/login')
		} else {
			fetchRequest(token)
		}
	}, [navigate])

	const fetchRequest = async token => {
		const response = await fetch('http://localhost:3001/request', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (response.ok) {
			const data = await response.json()
			setRequest(data)
			setError('')
		} else {
			const data = await response.json()
			setError(data.message)
			setRequest([])
		}
	}

	return (
		<div className='task-history-container'>
			<Error message={error} />
			<h3>История обращений</h3>
			{request.length > 0 ? (
				<table className='task-table'>
					<thead>
						<tr>
							<th>№</th>
							<th>ФИО</th>
							<th>Машина</th>
							<th>Дата бронирования</th>
							<th>Статус</th>
							<th>Email</th>
							<th>Телефон</th>
						</tr>
					</thead>
					<tbody>
						{request.map(req => (
							<tr key={req.req_id}>
								<td>{req.id}</td>
								<td>{req.full_name}</td>
								<td>{req.car}</td>
								<td>{req.data}</td>
								<td>{req.status}</td>
								<td>{req.email}</td>
								<td>{req.phone}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>Нет обращений</p>
			)}
		</div>
	)
}

export default RequestHistory
