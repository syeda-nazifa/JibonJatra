import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileViewUpdate({ user, onUpdate }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Initialize form when user prop changes
  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email, password: '', confirmPassword: '' });
    }
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Not logged in');
      return;
    }

    // Check password validations
    if (form.password.trim() !== '') {
      if (form.password === form.confirmPassword) {
        if (form.password === '') {
          setMessage('New password cannot be empty.');
          return;
        }
        if (form.password === '********') {
          // Just a placeholder, ignore if you don't use it
        }
        // Here you could check if password is same as old one,
        // but we don't have old password value in frontend for security reasons.
        // So let's assume backend will reject if same password is sent.
      } else {
        setMessage('Passwords do not match.');
        return;
      }
    }

    setLoading(true);

    const updateData = { name: form.name, email: form.email };
    if (form.password.trim() !== '') updateData.password = form.password;

    try {
      const res = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        // Check if backend returned error about same password
        const errData = await res.json();
        if (errData.message === 'Try something new') {
          setMessage('New password cannot be the same as the old password. Try something new.');
        } else {
          throw new Error('Update failed');
        }
        setLoading(false);
        return;
      }

      const updatedUser = await res.json();

      setMessage('Profile updated successfully');

      setForm((f) => ({ ...f, password: '', confirmPassword: '' }));

      if (updateData.password) {
        // If password changed, force logout and redirect to login
        localStorage.removeItem('token');
        alert('Password changed successfully. Please log in again.');
        navigate('/login');
      } else {
        if (onUpdate) onUpdate(updatedUser); // update parent state
      }
    } catch {
      setMessage('Error updating profile');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      {message && <p className="text-red-600">{message}</p>}
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="New password (leave blank to keep)"
        className="w-full p-2 border rounded"
      />
      <input
        name="confirmPassword"
        type="password"
        value={form.confirmPassword}
        onChange={handleChange}
        placeholder="Re-enter new password"
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
