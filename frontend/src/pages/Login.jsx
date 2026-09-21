import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../api";
function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            const response = await fetch(
                `${API_URL}/api/users/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            if (response.ok) {

                const user = await response.json();

                // Save logged-in user
                localStorage.setItem(
                    "user",
                    JSON.stringify(user)
                );

                // Update navbar login/logout status
                window.dispatchEvent(
                    new Event("storage")
                );

                setMessage("Login successful!");

                // Go to home page
                setTimeout(() => {
                    navigate("/");
                }, 1000);

            } else {

                setMessage("Invalid email or password.");

            }

        } catch (error) {

            console.error("Error:", error);

            setMessage("Cannot connect to the server.");

        }
    };

    return (
        <div className="form-page">

            <div className="form-container">

                <h1>Login</h1>

                <p className="form-subtitle">
                    Welcome back to SkillBridge
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="form-button"
                    >
                        Login
                    </button>

                </form>

                {message && (
                    <p>{message}</p>
                )}

                <p className="register-link">
    Don't have an account?{" "}
    <span onClick={() => navigate("/register")}>
        Register
    </span>
</p>

            </div>

        </div>
    );
}

export default Login;