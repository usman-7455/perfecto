import React, { useState } from 'react'
import { supabase } from '../../../api/supabaseClient'
import { useNavigate } from 'react-router-dom'
import './SignUp.css'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Basic validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.')
      setLoading(false)
      return
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.')
      setLoading(false)
      return
    }

    // Proceed with sign up - Supabase will handle user existence check
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      let userFriendlyMessage = error.message
      
      // Handle specific Supabase Auth errors
      if (error.message.includes('already registered') || error.message.includes('already exists')) {
        userFriendlyMessage = 'User with this email already exists. Please sign in instead.'
      } else if (error.message.includes('Invalid email')) {
        userFriendlyMessage = 'Please enter a valid email address.'
      } else if (error.message.includes('Password')) {
        userFriendlyMessage = 'Password must be at least 6 characters long.'
      }
      
      setError(userFriendlyMessage)
      alert(userFriendlyMessage)
    } else {
      alert('Check your email for confirmation link.')
      navigate('/signin')
    }
    setLoading(false)
  }

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={6}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default SignUp
