import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadSkill() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        skill: "",
        description: ""
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

        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
            setMessage("Please login first.");
            return;
        }

        const user = JSON.parse(savedUser);

        try {
            const response = await fetch(
                `http://localhost:8080/api/posts?userId=${user.id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            if (response.ok) {
                setMessage("Skill uploaded successfully!");

                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
            } 
             else {
    const errorText = await response.text();
    console.log("Upload failed:", response.status, errorText);
    setMessage(`Failed to upload skill. Status: ${response.status}`);
}
           
        } catch (error) {
            console.error("Error:", error);
            setMessage("Cannot connect to the server.");
        }
    };

    return (
        <div className="upload-page">

            <div className="upload-container">

                <h1>Upload Skill</h1>

                <p className="form-subtitle">
                    Share your knowledge with other SkillBridge students.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Skill Name</label>

                        <input
                            type="text"
                            name="skill"
                            value={formData.skill}
                            onChange={handleChange}
                            placeholder="Example: Java"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>Title</label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Example: Java Programming Basics"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>Description</label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe what you can teach..."
                            rows="5"
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="form-button"
                    >
                        Upload Skill
                    </button>

                </form>


                {message && (
                    <p>{message}</p>
                )}

            </div>

        </div>
    );
}

export default UploadSkill;