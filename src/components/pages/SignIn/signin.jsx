import React, { useState } from 'react'
import { supabase } from '../../../api/supabaseClient'
import { useNavigate } from 'react-router-dom'
import './signin.css'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      navigate('/tasks')  // redirect after successful sign in
    }
    setLoading(false)
  }

  return (
    <div className="container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
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
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}
      
      <div className="signup-link">
        <p>
          Don't have an account?{' '}
          <button 
            type="button" 
            className="signup-btn"
            onClick={() => navigate('/signup')}
          >
            SIGN UP
          </button>
        </p>
      </div>
    </div>
  )
}

export default SignIn
