import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../api";

function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
            navigate("/login");
            return;
        }

        const currentUser = JSON.parse(savedUser);

        // Load the latest user information from the backend
        const loadUserAndPosts = async () => {
            try {
                const userResponse = await fetch(
                    `${API_URL}/api/users/${currentUser.id}`
                );

                if (!userResponse.ok) {
                    navigate("/login");
                    return;
                }

                const latestUser = await userResponse.json();

                // Update localStorage with the latest user data
                localStorage.setItem("user", JSON.stringify(latestUser));

                // Update the dashboard
                setUser(latestUser);

                // Load uploaded skills
                const postResponse = await fetch(
                    `${API_URL}/api/posts/user/${latestUser.id}`
                );

                if (postResponse.ok) {
                    const postData = await postResponse.json();
                    setPosts(postData);
                }

            } catch (error) {
                console.error("Error loading dashboard:", error);
            }
        };

        loadUserAndPosts();

    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">

                <h1>Welcome, {user.fullName}!</h1>

                <p className="dashboard-subtitle">
                    Welcome to your SkillBridge dashboard.
                </p>

                {/* Skills I Can Teach */}
                <div className="dashboard-card">
                    <h2>Skills I Can Teach</h2>
                    <p>
                        {user.skillsToTeach || "No skills added yet."}
                    </p>
                </div>

                {/* Skills I Want To Learn */}
                <div className="dashboard-card">
                    <h2>Skills I Want to Learn</h2>
                    <p>
                        {user.skillsToLearn || "No skills added yet."}
                    </p>
                </div>

                {/* Uploaded Skills */}
                <div className="dashboard-card">
                    <h2>My Uploaded Skills</h2>

                    {posts.length === 0 ? (
                        <p>You have not uploaded any skills yet.</p>
                    ) : (
                        posts.map((post) => (
                            <div
                                key={post.id}
                                style={{
                                    marginBottom: "20px",
                                    padding: "15px",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px"
                                }}
                            >
                                <h3>{post.title}</h3>

                                <p>
                                    <strong>Skill:</strong>{" "}
                                    {post.skill}
                                </p>

                                <p>
                                    <strong>Description:</strong>{" "}
                                    {post.description}
                                </p>
                            </div>
                        ))
                    )}
                </div>
{/* Quick Actions */}
<div className="dashboard-card">
    <h2>Quick Actions</h2>

    <button
        className="form-button"
        style={{ marginBottom: "10px" }}
        onClick={() => navigate("/upload-skill")}
    >
        Upload New Skill
    </button>

    <button
        className="form-button"
        onClick={() => navigate("/requests")}
    >
        View Connection Requests
    </button>
</div>

                {/* Logout */}
                <button
                    className="form-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>
        </div>
    );
}

export default Dashboard;