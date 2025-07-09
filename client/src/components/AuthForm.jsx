import { useState } from 'react';

const AuthForm = ({ title, onSubmit }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const isRegister = title === 'Register';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = isRegister
      ? form
      : { email: form.email, password: form.password };
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold">{title}</h2>
      {isRegister && (
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      )}
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-cyan-700 text-white py-2 rounded hover:bg-cyan-800"
      >
        {title}
      </button>
    </form>
  );
};

export default AuthForm;
