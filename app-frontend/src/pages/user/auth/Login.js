import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("user1@example.com");  // Changed from username to email
    const [password, setPassword] = useState("password1");
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setToken , login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage("Please enter both email and password.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post("http://localhost:1000/api/login", {
                email,  // Send email instead of username
                password,
            });
            login(response.data.token,response.data.user );
            localStorage.setItem("token", response.data.token);
            navigate("/home");
        } catch (error) {
            console.error("Authentication failed:", error);
            setToken(null);
            localStorage.removeItem("token");
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || "Authentication failed.");
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"  // Changed input type to email
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    disabled={loading}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
