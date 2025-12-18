import { useState } from 'react';
import { useNavigate, useOutletContext, Navigate } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
  const { user, onLogin } = useOutletContext();
  
  if (user) {
    return <Navigate to="/home" replace />;
  }
  
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '', email: '' });
  const [resetData, setResetData] = useState({ username: '', newPassword: '', confirmNewPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('hospitalUsers');
    return saved ? JSON.parse(saved) : [{ username: 'admin', password: 'admin', email: 'admin@hospital.com' }];
  });
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('Username is required');
      return false;
    }
    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (!isLogin) {
      if (!formData.email.trim()) {
        setError('Email is required');
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError('Please enter a valid email');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) return;
    
    if (isLogin) {
      // Get fresh user data from localStorage
      const savedUsers = localStorage.getItem('hospitalUsers');
      const currentUsers = savedUsers ? JSON.parse(savedUsers) : [{ username: 'admin', password: 'admin', email: 'admin@hospital.com' }];
      const user = currentUsers.find(u => u.username === formData.username && u.password === formData.password);
      if (user) {
        onLogin(formData.username);
        navigate('/home');
      } else {
        setError('Invalid username or password');
      }
    } else {
      if (users.find(u => u.username === formData.username)) {
        setError('Username already exists');
        return;
      }
      if (users.find(u => u.email === formData.email)) {
        setError('Email already registered');
        return;
      }
      const newUsers = [...users, { username: formData.username, password: formData.password, email: formData.email }];
      setUsers(newUsers);
      localStorage.setItem('hospitalUsers', JSON.stringify(newUsers));
      setSuccess('Account created successfully!');
      setTimeout(() => {
        onLogin(formData.username);
        navigate('/home');
      }, 1500);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!resetData.username.trim()) {
      setError('Username is required');
      return;
    }
    if (!resetData.newPassword) {
      setError('New password is required');
      return;
    }
    if (resetData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (resetData.newPassword !== resetData.confirmNewPassword) {
      setError('Passwords do not match');
      return;
    }
    
    const userIndex = users.findIndex(u => u.username === resetData.username);
    if (userIndex === -1) {
      setError('Username not found');
      return;
    }
    
    const updatedUsers = [...users];
    updatedUsers[userIndex].password = resetData.newPassword;
    setUsers(updatedUsers);
    localStorage.setItem('hospitalUsers', JSON.stringify(updatedUsers));
    setSuccess('Password reset successfully!');
    setTimeout(() => {
      setShowForgotPassword(false);
      setResetData({ username: '', newPassword: '', confirmNewPassword: '' });
      setIsLogin(true);
    }, 1500);
  };
  
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setFormData({ username: '', password: '', confirmPassword: '', email: '' });
  };

  const showForgotPasswordForm = () => {
    setShowForgotPassword(true);
    setError('');
    setSuccess('');
    setResetData({ username: '', newPassword: '', confirmNewPassword: '' });
  };

  const backToLogin = () => {
    setShowForgotPassword(false);
    setError('');
    setSuccess('');
    setIsLogin(true);
  };

  if (showForgotPassword) {
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={handleForgotPassword}>
          <h2>Reset Password</h2>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <input
            type="text"
            placeholder="Username"
            value={resetData.username}
            onChange={(e) => setResetData({...resetData, username: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={resetData.newPassword}
            onChange={(e) => setResetData({...resetData, newPassword: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={resetData.confirmNewPassword}
            onChange={(e) => setResetData({...resetData, confirmNewPassword: e.target.value})}
            required
          />
          <button type="submit">Reset Password</button>
          <p className="toggle-text">
            <span onClick={backToLogin} className="toggle-link">Back to Login</span>
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Hospital Login' : 'Create Account'}</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          required
        />
        {!isLogin && (
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />
        )}
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        {isLogin && (
          <p className="forgot-password">
            <span onClick={showForgotPasswordForm} className="toggle-link">Forgot Password?</span>
          </p>
        )}
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account? "}
          <span onClick={toggleMode} className="toggle-link">
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;