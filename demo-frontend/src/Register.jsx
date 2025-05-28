import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Register() {
    const [form, setForm] = useState({ 
        username: '', 
        email: '', 
        password: '',
        confirmPassword: '' 
    });
    
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touched, setTouched] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    // Form validation
    useEffect(() => {
        const validateForm = () => {
        const newErrors = {};
        
        if (touched.username && !form.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (touched.username && form.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }
        
        if (touched.email && !form.email) {
            newErrors.email = 'Email is required';
        } else if (touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        
        if (touched.password && !form.password) {
            newErrors.password = 'Password is required';
        } else if (touched.password && form.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        if (touched.confirmPassword && form.password !== form.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        setErrors(newErrors);
        };
        
        validateForm();
    }, [form, touched]);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const handleBlur = e => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ text: '', type: '' });
        
        try {
        const res = await axios.post("http://localhost:8080/api/users/register", {
            username: form.username,
            email: form.email,
            password: form.password
        });
        
        setMessage({ 
            text: `User ${res.data.username} registered successfully!`, 
            type: 'success' 
        });
        setForm({ username: '', email: '', password: '', confirmPassword: '' });
        setTouched({});
        } catch (err) {
        let errorMessage = "An error occurred";
        
        if (err.response) {
            if (err.response.status === 409) {
            errorMessage = "Username or email already exists";
            } else {
            errorMessage = err.response.data.message || "Registration failed";
            }
        } else if (err.request) {
            errorMessage = "Server not responding";
        }
        
        setMessage({ text: errorMessage, type: 'error' });
        } finally {
        setIsSubmitting(false);
        }
    };

    const isFormValid = () => {
        return (
        form.username && 
        form.email && 
        form.password && 
        form.password === form.confirmPassword &&
        Object.keys(errors).length === 0
        );
    };

    return (
        <div className="form-container">
        <h2>Registration Form</h2>
        
        {message.text && (
            <div className={`message ${message.type}`}>
            {message.text}
            </div>
        )}
        
        <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.username ? 'error' : ''}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
            </div>
            
            <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
                <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.password ? 'error' : ''}
                />
                <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                >
                {showPassword ? '🙈' : '👁️'}
                </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
            )}
            </div>
            
            <button 
            type="submit" 
            disabled={!isFormValid() || isSubmitting}
            className="submit-btn"
            >
            {isSubmitting ? 'Registering...' : 'Register'}
            </button>
        </form>
        </div>
    );
}
export default Register;