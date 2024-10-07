import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthCallbackHandler: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Processing login...");

  useEffect(() => {
    const handleCallback = async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get("code");
      console.log(code);
      // localStorage.setItem("code", code );
      const codeVerifier = localStorage.getItem("verifier");

      alert(`
        "code": ${JSON.stringify(code)},
        "codeVerifier": ${JSON.stringify(codeVerifier)},
      `);
      if (code) {
        try {
          // Send the code to your backend
          const response = await axios.post(
            "http://localhost:3001/auth/sso/verify",
            { verifyDetails: { code, codeVerifier } }
          );
          console.log(response);
          // Assuming your backend sends back some user info or tokens
          const { user, token } = response.data;

          // Save the token or user info to localStorage or your state management solution
          localStorage.setItem("authToken", token);

          setMessage("Login successful!");
          // Redirect to the main app page or dashboard
          setTimeout(() => navigate("/"), 2000);
        } catch (error) {
          console.error("Error during SSO callback:", error);
          setMessage("Login failed. Please try again.");
          setTimeout(() => navigate("/login"), 2000);
        }
      } else {
        setMessage("No authorization code found in URL");
        setTimeout(() => navigate("/login"), 2000);
      }
    };

    handleCallback();
  }, [location, navigate]);

  return <div>{message}</div>;
};

export default OAuthCallbackHandler;
