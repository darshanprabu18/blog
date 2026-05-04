import { useEffect, useState } from 'react';
import { FiEdit3, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard.jsx';
import SkeletonCard from '../components/SkeletonCard.jsx';
import api, { getErrorMessage } from '../services/api.js';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const { data } = await api.get('/posts');
        setPosts(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const filteredPosts = posts.filter((post) => (
    post.title.toLowerCase().includes(query.toLowerCase())
    || post.content.toLowerCase().includes(query.toLowerCase())
  ));

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <span className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-extrabold text-fuchsia-600 shadow-md shadow-fuchsia-100">
            Colorful stories, thoughtful comments
          </span>
          <h1 className="max-w-3xl text-5xl font-black leading-tight text-slate-950 sm:text-6xl">
            Publish ideas that feel alive.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            A modern MERN blog for writing, editing, sharing, and discussing posts with a polished reader experience.
          </p>
          <Link to="/create" className="gradient-button mt-7">
            <FiEdit3 />
            Write a Post
          </Link>
        </div>
        <div className="relative h-80 overflow-hidden rounded-[2rem] shadow-glow">
          <img
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80"
            alt="Writing desk"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-950/45 via-fuchsia-500/10 to-cyan-300/20" />
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-black text-slate-950">Latest Posts</h2>
        <label className="relative block w-full sm:max-w-sm">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-500" />
          <input
            className="field pl-11"
            placeholder="Search posts"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      {error && <div className="mb-6 rounded-2xl bg-rose-50 p-4 font-bold text-rose-700">{error}</div>}

      {loading ? (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl p-10 text-center">
          <h3 className="text-2xl font-black text-slate-950">No posts yet</h3>
          <p className="mt-2 text-slate-600">Be the first author to brighten the feed.</p>
        </div>
      )}
    </section>
  );
}

export default Home;
