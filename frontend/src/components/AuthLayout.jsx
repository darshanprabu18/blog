import { motion } from 'framer-motion';
import { FiFeather } from 'react-icons/fi';

function AuthLayout({ title, subtitle, children }) {
  return (
    <section className="grid min-h-[calc(100vh-77px)] place-items-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel w-full max-w-md rounded-[2rem] p-8"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-pink-500 via-violet-500 to-cyan-400 text-3xl text-white shadow-lg shadow-violet-400/30">
            <FiFeather />
          </div>
          <h1 className="text-3xl font-black text-slate-950">{title}</h1>
          <p className="mt-2 text-slate-600">{subtitle}</p>
        </div>
        {children}
      </motion.div>
    </section>
  );
}

export default AuthLayout;
