import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import OAuthCallbackHandler from './OAuthCallbackHandler';

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const Home: React.FC = () => <div>Welcome to the authenticated area!</div>;

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/oauth-callback" element={<OAuthCallbackHandler />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
      </Routes>
    </Router>
  );
};

export default App;