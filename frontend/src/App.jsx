import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CreateEditPost from './pages/CreateEditPost.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import PostDetails from './pages/PostDetails.jsx';
import Register from './pages/Register.jsx';

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#f8f7ff] text-slate-900">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#e879f944,transparent_30%),radial-gradient(circle_at_top_right,#38bdf844,transparent_35%),linear-gradient(135deg,#fff7ed,#f8f7ff_48%,#ecfeff)]" />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route
              path="/create"
              element={(
                <ProtectedRoute>
                  <CreateEditPost />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/edit/:id"
              element={(
                <ProtectedRoute>
                  <CreateEditPost />
                </ProtectedRoute>
              )}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'font-medium',
          style: {
            borderRadius: '16px',
            boxShadow: '0 18px 60px rgba(15, 23, 42, 0.18)'
          }
        }}
      />
    </div>
  );
}

export default App;
