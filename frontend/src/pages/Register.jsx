import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        skillsToTeach: "",
        skillsToLearn: ""
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
                "http://localhost:8080/api/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            if (response.ok) {
                setMessage("Registration successful!");

                setFormData({
                    fullName: "",
                    email: "",
                    phoneNumber: "",
                    password: "",
                    skillsToTeach: "",
                    skillsToLearn: ""
                });

                setTimeout(() => {
                    navigate("/login");
                }, 1000);

            } else {
                setMessage("Registration failed. Please try again.");
            }

        } catch (error) {
            console.error("Error:", error);
            setMessage("Cannot connect to the server.");
        }
    };

    return (
        <div className="form-page">

            <div className="form-container">

                <h1>Create Account</h1>

                <p className="form-subtitle">
                    Join SkillBridge and connect through skills
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Full Name</label>

                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

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
                        <label>Phone Number</label>

                        <input
    type="tel"
    name="phoneNumber"
    value={formData.phoneNumber}
    onChange={handleChange}
    placeholder="Enter your phone number (optional)"
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

                    <div className="form-group">
                        <label>Skills I Can Teach</label>

                        <input
                            type="text"
                            name="skillsToTeach"
                            value={formData.skillsToTeach}
                            onChange={handleChange}
                            placeholder="Example: Java, HTML, CSS"
                        />
                    </div>

                    <div className="form-group">
                        <label>Skills I Want to Learn</label>

                        <input
                            type="text"
                            name="skillsToLearn"
                            value={formData.skillsToLearn}
                            onChange={handleChange}
                            placeholder="Example: React, Python"
                        />
                    </div>

                    <button
                        type="submit"
                        className="form-button"
                    >
                        Create Account
                    </button>

                </form>

                {message && (
                    <p>{message}</p>
                )}

            </div>

        </div>
    );
}

export default Register;