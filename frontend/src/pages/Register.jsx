import { useState } from 'react';
import { FiLock, FiMail, FiUser, FiUserPlus } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function Register() {
  const { register, authLoading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await register(formData);
    navigate('/');
  };

  return (
    <AuthLayout title="Start blooming" subtitle="Create your account and publish your first idea.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"><FiUser /> Name</span>
          <input className="field" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"><FiMail /> Email</span>
          <input className="field" type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"><FiLock /> Password</span>
          <input className="field" type="password" name="password" value={formData.password} onChange={handleChange} minLength="6" required />
        </label>
        <button type="submit" className="gradient-button w-full" disabled={authLoading}>
          <FiUserPlus />
          {authLoading ? 'Creating account...' : 'Register'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">
        Already registered? <Link to="/login" className="font-extrabold text-fuchsia-600">Login</Link>
      </p>
    </AuthLayout>
  );
}

export default Register;
