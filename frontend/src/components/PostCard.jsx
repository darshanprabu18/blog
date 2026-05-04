import { motion } from 'framer-motion';
import { FiArrowRight, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { formatDate, truncate } from '../utils/formatDate.js';

function PostCard({ post }) {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group overflow-hidden rounded-3xl border border-white/80 bg-white/85 shadow-xl shadow-violet-200/40 backdrop-blur"
    >
      <Link to={`/posts/${post._id}`} className="block">
        <div className="relative h-56 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
          <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-violet-700 shadow">
            {formatDate(post.createdAt)}
          </span>
        </div>
        <div className="space-y-4 p-6">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
            <FiUser className="text-fuchsia-500" />
            {post.author?.name || 'Anonymous'}
          </div>
          <h2 className="text-2xl font-black leading-tight text-slate-950">{post.title}</h2>
          <p className="leading-7 text-slate-600">{truncate(post.content.replace(/\n/g, ' '), 170)}</p>
          <span className="inline-flex items-center gap-2 font-extrabold text-violet-700">
            Read story <FiArrowRight />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default PostCard;
