import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            Share your ideas.
            <br />
            <span className="text-accent">Build something.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed">
            A place for entrepreneurs and innovators to share ideas, get feedback, and connect with like-minded builders.
          </p>
          
          {!user ? (
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/signup"
                className="bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-md font-medium transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border border-gray-700 hover:border-gray-600 text-white px-8 py-3 rounded-md font-medium transition-colors"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <Link
              to="/dashboard"
              className="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-md font-medium transition-colors"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">About the Club</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We're a community of entrepreneurs, innovators, and builders who believe in the power of ideas. 
                Whether you're working on your next startup, exploring a side project, or just have an idea you want to share, 
                this is the place for you.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Share your ideas, get feedback from the community, and help others build something meaningful. 
                Every great product started as an idea—let's make yours happen.
              </p>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <h3 className="font-semibold mb-2">Share Ideas</h3>
                <p className="text-sm text-gray-400">
                  Post your ideas and get feedback from the community.
                </p>
              </div>
              <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800 ml-8">
                <h3 className="font-semibold mb-2">Vote & Discuss</h3>
                <p className="text-sm text-gray-400">
                  Upvote ideas you like and engage in meaningful discussions.
                </p>
              </div>
              <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <h3 className="font-semibold mb-2">Build Together</h3>
                <p className="text-sm text-gray-400">
                  Connect with other builders and turn ideas into reality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;

