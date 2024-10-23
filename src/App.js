import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import TodoPage from './pages/TodoPage'
import RegisterPage from './pages/RegisterPage'
import { useEffect, useState } from 'react'
import PrivateRoute from './route/PrivateRoute'
import api from './utils/api'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const getUser = async () => {
    try {
      const storedToken = sessionStorage.getItem('token')
      if (storedToken) {
        const response = await api.get('/user/me')
        setUser(response.data.user)
      }
    } catch (error) {
      setUser(null)
    }
    setLoading(false)
  }

  useEffect(() => {
    getUser()
  }, [])

  if (loading) {
    return <p>Auth Checking</p>
  }

  return (
    <Routes>
      <Route
        path='/'
        element={
          <PrivateRoute user={user}>
            <TodoPage user={user} setUser={setUser} />
          </PrivateRoute>
        }
      />
      <Route path='/register' element={<RegisterPage />} />

      <Route path='/login' element={<LoginPage user={user} setUser={setUser} />} />
    </Routes>
  )
}

export default App
