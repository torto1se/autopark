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
			<h3 style={{ marginBottom: '20px' }}>История обращений</h3>
			{request.length > 0 ? (
				<table
					style={{
						borderCollapse: 'collapse',
						width: '100%',
						backgroundColor: 'white',
						boxShadow: '0 0 10px rgba(0,0,0,0.1)',
						borderRadius: '5px',
					}}
				>
					<thead>
						<tr>
							<th
								style={{
									border: '1px solid #ddd',
									padding: '8px',
									backgroundColor: '#f5f5f5',
								}}
							>
								№
							</th>
							<th
								style={{
									border: '1px solid #ddd',
									padding: '8px',
									backgroundColor: '#f5f5f5',
								}}
							>
								ФИО
							</th>
							<th
								style={{
									border: '1px solid #ddd',
									padding: '8px',
									backgroundColor: '#f5f5f5',
								}}
							>
								Машина
							</th>
							<th
								style={{
									border: '1px solid #ddd',
									padding: '8px',
									backgroundColor: '#f5f5f5',
								}}
							>
								Дата бронирования
							</th>
							<th
								style={{
									border: '1px solid #ddd',
									padding: '8px',
									backgroundColor: '#f5f5f5',
								}}
							>
								Статус
							</th>
							<th
								style={{
									border: '1px solid #ddd',
									padding: '8px',
									backgroundColor: '#f5f5f5',
								}}
							>
								Email
							</th>
							<th
								style={{
									border: '1px solid #ddd',
									padding: '8px',
									backgroundColor: '#f5f5f5',
								}}
							>
								Телефон
							</th>
						</tr>
					</thead>
					<tbody>
						{request.map(req => (
							<tr key={req.req_id}>
								<td style={{ border: '1px solid #ddd', padding: '8px' }}>
									{req.id}
								</td>
								<td style={{ border: '1px solid #ddd', padding: '8px' }}>
									{req.full_name}
								</td>
								<td style={{ border: '1px solid #ddd', padding: '8px' }}>
									{req.car}
								</td>
								<td style={{ border: '1px solid #ddd', padding: '8px' }}>
									{req.data}
								</td>
								<td style={{ border: '1px solid #ddd', padding: '8px' }}>
									{req.status}
								</td>
								<td style={{ border: '1px solid #ddd', padding: '8px' }}>
									{req.email}
								</td>
								<td style={{ border: '1px solid #ddd', padding: '8px' }}>
									{req.phone}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p style={{ color: 'gray' }}>Нет обращений.</p>
			)}
		</div>
	)
}

export default RequestHistory
