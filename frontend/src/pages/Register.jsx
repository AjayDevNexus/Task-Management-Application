import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';
import { useAuth } from '../hooks/useAuth';
import PropTypes from 'prop-types';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await register(email, password);
      login(token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Register</h2>
        {error && <p className="error-text">{error}</p>}
        <div onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="submit-button"
          >
            Register
          </button>
          <p className="link-text">
            Already have an account?{' '}
            <a href="/login" className="link">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
};

export default Register;