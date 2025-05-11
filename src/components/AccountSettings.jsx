import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AccountSettings = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      navigate('/login');
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  if (!user) return <div className="p-6">Loading user info...</div>;

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 bg-gray-50">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Account Settings</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="flex items-start space-x-4 mb-4">
          <div className="relative">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}`}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 bg-white border rounded-full p-1">
              <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path d="M2 16h16v2H2z" />
              </svg>
            </span>
          </div>
          <div>
            <h3 className="font-bold text-lg">{user.fullName}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm">
          Phone: {user.phone}<br />
          Company: {user.company}<br />
          Agency: {user.isAgency}
        </p>
      </div>

      <footer className="text-center text-sm text-gray-500 mt-10 mb-4">
        Made <span className="text-red-500">❤️</span> by{' '}
        <a
          href="https://github.com/udaynatthani"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Uday Natthani
        </a>
      </footer>
    </div>
  );
};

export default AccountSettings;
