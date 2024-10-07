import React, { useState } from "react";
import axios from "axios";

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3001/signin/sso");
      const ssoUrl = response.data.data;
      alert(JSON.stringify(ssoUrl));
      localStorage.setItem("verifier", ssoUrl.codeVerifier);
      window.location.href = ssoUrl.url;
    } catch (err) {
      setError("Failed to initiate SSO login. Please try again.");
      console.error("SSO initiation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Loading..." : "Login with Microsoft"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
