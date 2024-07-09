import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../css/styles.css';

export default function Signup({setIsLoggedIn,setUserData}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  // const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const signupData = { username, email, password, address, phone };
    console.log(signupData);
    try {
      const response = await fetch('http://localhost:4000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();
      if (response.status === 200) {
        console.log('Signin successful, navigating to home');
        setUserData(data.userData)
        setIsLoggedIn(true)
        navigate("/dashboard");
      } else {
        setMessage(data.message || 'Login failed');
        navigate("/login");
      }
      setMessage(data.message);
      console.log('Signup data submitted successfully:', data);
    } catch (err) {
      console.log('Error:', err);
      setMessage('Something went wrong. Please try again.');
    }
  };
  /*phone number validation */

  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    // Check if the phone number matches the pattern
    const phoneRegex = /^\d{10}$/;
    setIsValid(phoneRegex.test(newPhone));
  };



  return (
    <div className="background-container">
      <main className="form-container" >
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={handlePhoneChange}
          />
      {!isValid && <p style={{ color: "red" }}>Please enter a valid 10-digit phone number.</p>}
          
          <button type="submit" className="btn" >Sign Up</button>
        </form>
        <p>{message}</p>
        <p>Already have an account? <Link to="/login">Log in here</Link>.</p>
      </main>
    </div>
  );
}