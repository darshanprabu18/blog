import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiEdit2, FiMessageCircle, FiSend, FiTrash2, FiUser } from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import api, { getErrorMessage } from '../services/api.js';
import { formatDate } from '../utils/formatDate.js';

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [commenting, setCommenting] = useState(false);

  const isAuthor = user?.id === post?.author?._id;

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const [postResponse, commentsResponse] = await Promise.all([
          api.get(`/posts/${id}`),
          api.get(`/comments/${id}`)
        ]);
        setPost(postResponse.data);
        setComments(commentsResponse.data);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm('Delete this post? This also removes its comments.');
    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/posts/${id}`);
      toast.success('Post deleted');
      navigate('/');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleComment = async (event) => {
    event.preventDefault();
    if (!commentText.trim()) {
      return;
    }

    setCommenting(true);
    try {
      const { data } = await api.post('/comments', { text: commentText, post: id });
      setComments((current) => [...current, data]);
      setCommentText('');
      toast.success('Comment added');
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setCommenting(false);
    }
  };

  if (loading) {
    return <Spinner label="Loading story" />;
  }

  if (!post) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <div className="glass-panel rounded-3xl p-10">
          <h1 className="text-3xl font-black text-slate-950">Post not found</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-14">
      <div className="relative min-h-[440px] overflow-hidden">
        <img src={post.image} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-violet-950/10" />
        <div className="relative mx-auto flex min-h-[440px] max-w-5xl flex-col justify-end px-4 pb-12 pt-20 sm:px-6 lg:px-8">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-extrabold text-violet-700">
              {formatDate(post.createdAt)}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-300/90 px-4 py-2 text-sm font-extrabold text-slate-900">
              <FiUser /> {post.author?.name}
            </span>
          </div>
          <h1 className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-6xl">{post.title}</h1>
          {isAuthor && (
            <div className="mt-7 flex gap-3">
              <Link to={`/edit/${post._id}`} className="soft-button">
                <FiEdit2 /> Edit
              </Link>
              <button type="button" onClick={handleDelete} className="inline-flex items-center gap-2 rounded-2xl bg-rose-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-rose-300 transition hover:-translate-y-0.5 hover:bg-rose-600">
                <FiTrash2 /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto mt-[-2rem] grid max-w-5xl gap-8 px-4 sm:px-6 lg:px-8">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-[2rem] p-6 leading-8 text-slate-700 sm:p-9"
        >
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-5 last:mb-0">{paragraph}</p>
          ))}
        </motion.article>

        <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="flex items-center gap-3 text-2xl font-black text-slate-950">
              <FiMessageCircle className="text-fuchsia-500" />
              Comments
            </h2>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-extrabold text-amber-700">
              {comments.length}
            </span>
          </div>

          {isAuthenticated ? (
            <form onSubmit={handleComment} className="mb-8 flex flex-col gap-3 sm:flex-row">
              <input
                className="field"
                placeholder="Add a thoughtful comment"
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
              />
              <button type="submit" className="gradient-button whitespace-nowrap" disabled={commenting}>
                <FiSend />
                {commenting ? 'Posting...' : 'Comment'}
              </button>
            </form>
          ) : (
            <div className="mb-8 rounded-2xl bg-violet-50 p-4 font-bold text-violet-700">
              <Link to="/login" className="underline">Login</Link> to join the discussion.
            </div>
          )}

          <div className="space-y-4">
            {comments.length > 0 ? comments.map((comment) => (
              <motion.div
                key={comment._id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-3xl rounded-tl-md bg-gradient-to-br from-white to-violet-50 p-5 shadow-md shadow-violet-100"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-extrabold text-slate-900">{comment.user?.name}</span>
                  <span className="text-slate-400">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="leading-7 text-slate-700">{comment.text}</p>
              </motion.div>
            )) : (
              <p className="rounded-2xl bg-white/70 p-5 text-center font-semibold text-slate-500">
                No comments yet. Start the conversation.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PostDetails;
