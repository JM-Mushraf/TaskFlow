import React, { useState } from 'react';
import './loginPage.css';

export default function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) errors.push('Min 6 chars');
    if (!/[A-Z]/.test(password)) errors.push('1 uppercase');
    if (!/[0-9]/.test(password)) errors.push('1 number');
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      setPasswordErrors(validatePassword(value)); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.password && passwordErrors.length === 0) {
      onLogin(formData.fullName, formData.email, formData.password);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#7b84ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '60px', height: '60px', margin: '0 auto 15px auto' }}>
              <path d="M 12,3 L 20,7.5 L 20,16.5 L 12,21 L 4,16.5 L 4,7.5 Z" />
            </svg>
          </div>
          <h1>TaskFlow</h1>
          <p>Sign in to manage your tasks</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>FULL NAME</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. JM Mushraf"
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>EMAIL ADDRESS</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>PASSWORD</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 6 chars, 1 uppercase, 1 number"
                className="input-field"
              />
              <span 
                className="password-icon" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ userSelect: 'none' }}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          <p className="password-validation">
            Password must be 6+ characters with an uppercase letter and a number.
          </p>

          <button 
            type="submit"
            className="signin-button"
            disabled={passwordErrors.length > 0 || !formData.fullName || !formData.email}
          >
            Sign In →
          </button>
        </form>
      </div>
    </div>
  );
}
