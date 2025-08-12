import React, { useEffect, useState } from 'react';

export default function ProfileViewUpdate() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Not logged in');
      return;
    }

    fetch('http://localhost:5000/api/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setForm({ name: data.name, email: data.email, password: '' }))
      .catch(() => setMessage('Failed to load profile'));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Not logged in');
      setLoading(false);
      return;
    }

    const updateData = { name: form.name, email: form.email };
    if (form.password.trim() !== '') updateData.password = form.password;

    try {
      const res = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      if (!res.ok) throw new Error('Update failed');
      setMessage('Profile updated successfully');
      setForm(f => ({ ...f, password: '' }));
    } catch {
      setMessage('Error updating profile');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      {message && <p>{message}</p>}
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <br />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <br />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="New password (leave blank to keep)"
      />
      <br />
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
