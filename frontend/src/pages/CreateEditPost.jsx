import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiImage, FiSave, FiType } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import api, { getErrorMessage } from '../services/api.js';

const defaultImage = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80';

function CreateEditPost() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({ title: '', image: defaultImage, content: '' });
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      return;
    }

    const loadPost = async () => {
      try {
        const { data } = await api.get(`/posts/${id}`);

        if (data.author?._id !== user.id) {
          toast.error('Only the author can edit this post');
          navigate(`/posts/${id}`);
          return;
        }

        setFormData({
          title: data.title,
          image: data.image,
          content: data.content
        });
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id, isEditing, navigate, user.id]);

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const { data } = isEditing
        ? await api.put(`/posts/${id}`, formData)
        : await api.post('/posts', formData);

      toast.success(isEditing ? 'Post updated' : 'Post published');
      navigate(`/posts/${data._id}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Spinner label="Loading post" />;
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel overflow-hidden rounded-[2rem]"
      >
        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-72">
            <img src={formData.image || defaultImage} alt="Post preview" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-extrabold text-violet-700">
                {isEditing ? 'Edit story' : 'Fresh draft'}
              </span>
              <h1 className="mt-4 text-4xl font-black leading-tight text-white">
                {formData.title || 'Give your post a magnetic title'}
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"><FiType /> Title</span>
              <input className="field" name="title" value={formData.title} onChange={handleChange} required maxLength="140" />
            </label>
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"><FiImage /> Image URL</span>
              <input className="field" name="image" value={formData.image} onChange={handleChange} required />
            </label>
            <label className="block">
              <span className="mb-2 text-sm font-bold text-slate-700">Content</span>
              <textarea
                className="field min-h-72 resize-y leading-7"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit" className="gradient-button w-full sm:w-auto" disabled={saving}>
              <FiSave />
              {saving ? 'Saving...' : isEditing ? 'Update Post' : 'Publish Post'}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

export default CreateEditPost;
