import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/users/login', form);
      setMessage('✅ Login successful!');
      localStorage.setItem('user', JSON.stringify(res.data)); // Optional auth
      navigate('/home'); // Redirect after login
    } catch (err) {
      setMessage('❌ Invalid email or password');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
         </div>
            </div>
        <button type="submit" className="submit-btn">Login</button>
        <p>{message}</p>
      </form>
    </div>
  );
}

export default Login;
