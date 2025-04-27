import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { useAuth } from '../hooks/useAuth';
import PropTypes from 'prop-types';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      authLogin(token);
      window.location.reload();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
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
            Login
          </button>
          <p className="link-text">
            Don't have an account?{' '}
            <a href="/register" className="link">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
};

export default Login;