const express = require('express')
const sqlite3 = require('sqlite3')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.json())

const db = new sqlite3.Database('./database.db', err => {
	if (err) {
		console.error(err.message)
	}
	console.log('БД подключена')
})

app.post('/registration', (req, res) => {
	const { email, password, full_name, phone, driver_license } = req.body

	db.get(`select * from user where email = ?`, (err, row) => {
		if (err) {
			return res.status(500).json({ error: err.message })
		}
		if (row) {
			return res
				.status(400)
				.json({ error: 'Пользователь с таким email уже существует!' })
		}

		db.run(
			`insert into user (email, password, full_name, phone, driver_license) values (?, ?, ?, ?, ?)`,
			[email, password, full_name, phone, driver_license],
			function (err) {
				if (err) {
					return res.status(400).json({ message: err.message })
				}
				res.status(201).json({ message: 'Пользователь зарегистрирован' })
			}
		)
	})
})

app.post('/login', (req, res) => {
	const { email, password } = req.body

	db.get(`select * from user where email = ?`, [email], (err, user) => {
		if (err || !user) {
			return res.status(401).json({ message: 'Неверный email или пароль' })
		}
		if (!password) {
			return res.status(401).json({ message: 'Неверный email или пароль' })
		}
		const token = jwt.sign(
			{ userId: user.id, email: user.email },
			'secret_key',
			{ expiresIn: '1h' }
		)
		res.json({ token })
	})
})

app.post('/request', (req, res) => {
	const { car, data } = req.body

	const token = req.headers.authorization?.split(' ')[1]
	if (!token) {
		console.log(token)
		return res.status(401).json({ message: 'Необходима авторизация' })
	}

	jwt.verify(token, 'secret_key', (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: 'Неверный токен' })
		}

		const id_user = decoded.userId

		db.get(
			`select full_name, email, phone from user where id = ?`,
			[id_user],
			(err, user) => {
				if (err || !user) {
					return res.status(404).json({ message: 'Пользователь не нейден' })
				}
				const { full_name, email, phone } = user
				const status = 'Новое'

				db.run(
					`insert into request (car, data, full_name, email, phone, status) values (?, ?, ?, ?, ?, ?)`,
					[car, data, full_name, email, phone, status],
					function (err) {
						if (err) {
							return res.status(400).json({ error: err.message })
						}
						res.status(201).json({ message: 'Заявка создана' })
					}
				)
			}
		)
	})
})

app.get('/request', (req, res) => {
	const token = req.headers.authorization?.split(' ')[1]

	if (!token) {
		return res.status(401).json({ message: 'Необходима авторизация' })
	}

	jwt.verify(token, 'secret_key', (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: 'Неверный токен' })
		}

		db.all(
			`select car, data, full_name, email, phone, status, id from request  where email = ? `,
			[decoded.email],
			(err, rows) => {
				if (err) {
					return res.status(500).json({ message: err.message })
				}
				res.json(rows)
			}
		)
	})
})

app.listen(port, () => {
	console.log(`Сервер запущен http://localhost:${port}`)
})
