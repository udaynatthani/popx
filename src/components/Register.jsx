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

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [isAgency, setIsAgency] = useState('Yes');

  const handleRegister = async () => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const hashedPassword = await hashPassword(password);

    const newUser = {
      fullName,
      phone,
      email,
      password: hashedPassword,
      company,
      isAgency
    };

    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between py-10">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create your PopX account</h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-purple-600 mb-1">Full Name *</label>
          <input
            type="text"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-purple-600 mb-1">Phone number *</label>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-purple-600 mb-1">Email address *</label>
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-purple-600 mb-1">Password *</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-purple-600 mb-1">Company name *</label>
          <input
            type="text"
            placeholder="Enter company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-purple-600 mb-2">
            Are you an Agency? *
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="agency"
                value="Yes"
                checked={isAgency === 'Yes'}
                onChange={() => setIsAgency('Yes')}
                className="accent-purple-600"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="agency"
                value="No"
                checked={isAgency === 'No'}
                onChange={() => setIsAgency('No')}
                className="accent-purple-600"
              />
              <span>No</span>
            </label>
          </div>
        </div>

        <button onClick={handleRegister} className="w-full bg-purple-600 text-white font-semibold py-2 rounded mb-4">
          Create Account
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-purple-600 font-medium underline"
          >
            Login
          </button>
        </p>
      </div>

      
      <footer className="text-center text-sm text-gray-500 mt-10 mb-4">
        Made ❤️ by <a href="https://github.com/udaynatthani" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Uday Natthani</a>
      </footer>
    </div>
  );
};

export default Register;
