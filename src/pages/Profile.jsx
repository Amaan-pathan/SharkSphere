import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Profile</h1>
          <p className="text-gray-400">Your account information</p>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <div className="text-white text-lg">{user.name}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <div className="text-white text-lg">{user.email}</div>
            </div>

            {user.emailVerified !== undefined && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email Verified</label>
                <div className="flex items-center gap-2">
                  {user.emailVerified ? (
                    <>
                      <span className="text-green-400">✓ Verified</span>
                    </>
                  ) : (
                    <span className="text-yellow-400">⚠ Not verified</span>
                  )}
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-gray-800">
              <button
                onClick={handleLogout}
                disabled={loading}
                className="bg-red-900/20 hover:bg-red-900/30 border border-red-800 text-red-300 font-medium px-6 py-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

