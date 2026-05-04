import { FiEdit3, FiLogIn, FiLogOut, FiPlusCircle, FiUserPlus } from 'react-icons/fi';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-white/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-sky-400 text-xl font-black text-white shadow-lg shadow-violet-400/30">
            IB
          </span>
          <span className="text-xl font-black tracking-tight text-slate-950">InkBloom</span>
        </Link>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <span className="hidden rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 sm:inline-flex">
                {user.name}
              </span>
              <NavLink to="/create" className="gradient-button !rounded-xl !px-4 !py-2">
                <FiPlusCircle />
                <span className="hidden sm:inline">New Post</span>
              </NavLink>
              <button type="button" onClick={handleLogout} className="soft-button !rounded-xl" aria-label="Logout">
                <FiLogOut />
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="soft-button !rounded-xl">
                <FiLogIn />
                <span className="hidden sm:inline">Login</span>
              </NavLink>
              <NavLink to="/register" className="gradient-button !rounded-xl !px-4 !py-2">
                <FiUserPlus />
                <span className="hidden sm:inline">Register</span>
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
