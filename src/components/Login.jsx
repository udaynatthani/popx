import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const hashedInputPassword = await hashPassword(password);
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = users.find(
      (user) => user.email === email && user.password === hashedInputPassword
    );

    if (matchedUser) {
      localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
      navigate('/account');
    } else {
      setError('User not found or incorrect password.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign in to your PopX account</h2>
        <p className="text-gray-500 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-purple-600 mb-1">Email Address</label>
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-purple-600 mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 text-white font-semibold py-2 rounded mb-4"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-purple-600 font-medium underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;