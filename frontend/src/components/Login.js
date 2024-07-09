import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/styles.css';

export default function Login({ setIsLoggedIn, setUserData }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { email, password };
    console.log('Submitting login data:', loginData);

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log('Response status:', response.status);
      console.log(data);

      if (response.status === 200) {
        console.log('Login successful, navigating to home');
        if(data.userData.email==="admin@gmail.com"){
          navigate("/admin");
          return;
        }
        setUserData(data.userData);
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        navigate('/dashboard');
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (err) {
      console.log('Error:', err);
      setMessage('Something went wrong. Please try again.');
    }
  };
  
  return (
    <div className="background-container">
      <main className="form-container">
        <h1><center><strong>Login</strong></center></h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn">Login</button>
        </form>
        {message && <p style={{ color: 'red' }}>{message}</p>}
        <p className='my-3'>Don't have an account? <Link to="/signup">Sign up here</Link>.</p>
      </main>
    </div>
  );
}
