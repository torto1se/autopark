import React from 'react'
import { Routes, Route } from 'react-router-dom'
import RegistrationPage from './components/RegistrationPage'
import LoginPage from './components/LoginPage'
import RequestPage from './components/RequestPage'
import RequestHistory from './components/RequestHistory'

function App() {
	return (
		<div>
			<Routes>
				<Route path='/registration' element={<RegistrationPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/request' element={<RequestPage />} />
				<Route path='/req-history' element={<RequestHistory />} />
			</Routes>
		</div>
	)
}

export default App
