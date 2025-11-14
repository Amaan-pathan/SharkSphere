import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PrivateRoute from './PrivateRoute.jsx';
import Navbar from '../components/Navbar.jsx';
import Landing from '../pages/Landing.jsx';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import CreateIdea from '../pages/CreateIdea.jsx';
import Profile from '../pages/Profile.jsx';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-idea"
          element={
            <PrivateRoute>
              <CreateIdea />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default AppRouter;

