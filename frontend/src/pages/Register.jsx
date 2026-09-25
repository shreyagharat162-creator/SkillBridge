import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        skillsToTeach: "",
        skillsToLearn: "",
        profileImageUrl: ""
    });

    const [profileImage, setProfileImage] = useState(null);
    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    // Handle profile image selection
    const handleImageChange = (event) => {

        const file = event.target.files[0];

        if (!file) {
            return;
        }

        // Check if selected file is an image
        if (!file.type.startsWith("image/")) {
            setMessage("Please select a valid image file.");
            return;
        }

        // Limit original image size to 5 MB
        if (file.size > 5 * 1024 * 1024) {
            setMessage("Please select an image smaller than 5 MB.");
            return;
        }

        const reader = new FileReader();

        reader.onload = (loadEvent) => {

            const image = new Image();

            image.onload = () => {

                const canvas = document.createElement("canvas");

                // Maximum image dimension
                const maxSize = 300;

                let width = image.width;
                let height = image.height;

                // Keep original aspect ratio
                if (width > height) {

                    if (width > maxSize) {
                        height = Math.round(
                            height * (maxSize / width)
                        );

                        width = maxSize;
                    }

                } else {

                    if (height > maxSize) {
                        width = Math.round(
                            width * (maxSize / height)
                        );

                        height = maxSize;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const context = canvas.getContext("2d");

                context.drawImage(
                    image,
                    0,
                    0,
                    width,
                    height
                );

                // Convert image to compressed JPEG
                const resizedImage = canvas.toDataURL(
                    "image/jpeg",
                    0.7
                );

                // Show preview
                setProfileImage(resizedImage);

                // Save image data in formData
                setFormData((previousData) => ({
                    ...previousData,
                    profileImageUrl: resizedImage
                }));

                setMessage("");
            };

            image.src = loadEvent.target.result;
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setMessage("Creating your account...");

        try {

            const response = await fetch(
                `${API_URL}/api/users/register`,
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
                    skillsToLearn: "",
                    profileImageUrl: ""
                });

                setProfileImage(null);

                setTimeout(() => {
                    navigate("/login");
                }, 1000);

            } else {

                setMessage(
                    "Registration failed. Please try again."
                );
            }

        } catch (error) {

            console.error("Error:", error);

            setMessage(
                "Cannot connect to the server."
            );
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

                    {/* Full Name */}

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


                    {/* Email */}

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


                    {/* Phone Number */}

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


                    {/* Password */}

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


                    {/* Skills To Teach */}

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


                    {/* Skills To Learn */}

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


                    {/* Profile Photo */}

                    <div className="form-group">

                        <label>Profile Photo (Optional)</label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                        <small>
                            JPG, PNG or other image files up to 5 MB.
                        </small>


                        {/* Image Preview */}

                        {profileImage && (

                            <div
                                style={{
                                    marginTop: "15px",
                                    textAlign: "center"
                                }}
                            >

                                <img
                                    src={profileImage}
                                    alt="Profile Preview"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        border: "2px solid #ccc"
                                    }}
                                />

                                <p
                                    style={{
                                        marginTop: "8px",
                                        fontSize: "14px"
                                    }}
                                >
                                    Profile photo selected
                                </p>

                            </div>

                        )}

                    </div>


                    {/* Register Button */}

                    <button
                        type="submit"
                        className="form-button"
                    >
                        Create Account
                    </button>

                </form>


                {/* Message */}

                {message && (
                    <p>{message}</p>
                )}

            </div>

        </div>
    );
}

export default Register;