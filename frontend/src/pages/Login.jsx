import { useState } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function Login() {
  const { login, authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(formData);
    navigate(location.state?.from?.pathname || '/');
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in and keep your stories moving.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"><FiMail /> Email</span>
          <input className="field" type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"><FiLock /> Password</span>
          <input className="field" type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <button type="submit" className="gradient-button w-full" disabled={authLoading}>
          <FiLogIn />
          {authLoading ? 'Signing in...' : 'Login'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">
        New here? <Link to="/register" className="font-extrabold text-fuchsia-600">Create an account</Link>
      </p>
    </AuthLayout>
  );
}

export default Login;
