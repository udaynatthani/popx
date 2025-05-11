import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between py-10">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to PopX</h1>
        <p className="text-gray-500 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </p>

        <button
          onClick={() => navigate('/register')}
          className="w-full bg-purple-600 text-white font-semibold py-2 rounded mb-4"
        >
          Create Account
        </button>

        <button
          onClick={() => navigate('/login')}
          className="w-full bg-purple-100 text-purple-700 font-semibold py-2 rounded"
        >
          Already Registered? Login
        </button>
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

export default Welcome;
