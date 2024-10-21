import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import api from '../utils/api'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      if (password !== passwordConfirm) {
        throw new Error('패스워드가 일치하지 않습니다.')
      }
      const response = await api.post('/user', { name, email, password })
      if (response.status === 200) {
        navigate('/login')
      } else {
        throw new Error(response.data.error)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className='display-center'>
      {error && <div className='color-red'>{error}</div>}
      <Form className='login-box' onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className='mb-3' controlId='formName'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='string'
            placeholder='Name'
            required
            onChange={e => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            required
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            required
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control
            type='password'
            placeholder='re-enter the password'
            required
            onChange={e => setPasswordConfirm(e.target.value)}
          />
        </Form.Group>

        <Button className='button-primary' type='submit'>
          회원가입
        </Button>
      </Form>
    </div>
  )
}

export default RegisterPage
