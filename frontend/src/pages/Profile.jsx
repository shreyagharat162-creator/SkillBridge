import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile() {

    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                // Fetch student profile
                const userResponse = await fetch(
                    `http://localhost:8080/api/users/${id}`
                );

                if (userResponse.ok) {

                    const userData = await userResponse.json();

                    setUser(userData);

                } else {

                    setMessage("User not found.");
                    return;

                }

                // Fetch student's uploaded skill posts
                const postsResponse = await fetch(
                    `http://localhost:8080/api/posts/user/${id}`
                );

                if (postsResponse.ok) {

                    const postsData = await postsResponse.json();

                    setPosts(postsData);

                } else {

                    setPosts([]);

                }

            } catch (error) {

                console.error("Error:", error);

                setMessage("Cannot connect to the server.");

            }
        };

        fetchProfile();

    }, [id]);


    const handleConnectionRequest = async () => {

        const savedUser = localStorage.getItem("user");

        if (!savedUser) {

            setMessage("Please login first.");

            return;

        }

        const currentUser = JSON.parse(savedUser);

        if (currentUser.id === user.id) {

            setMessage("You cannot send a request to yourself.");

            return;

        }

        try {

            const response = await fetch(
                `http://localhost:8080/api/requests?senderId=${currentUser.id}&receiverId=${user.id}`,
                {
                    method: "POST"
                }
            );

            if (response.ok) {

                setMessage(
                    "Connection request sent successfully!"
                );

            } else {

                setMessage(
                    "Failed to send connection request."
                );

            }

        } catch (error) {

            console.error("Error:", error);

            setMessage("Cannot connect to the server.");

        }
    };


    if (message && !user) {

        return (
            <div className="dashboard-page">
                <div className="dashboard-container">
                    <p>{message}</p>
                </div>
            </div>
        );

    }


    if (!user) {

        return (
            <div className="dashboard-page">
                <div className="dashboard-container">
                    <p>Loading profile...</p>
                </div>
            </div>
        );

    }


    return (

        <div className="dashboard-page">

            <div className="dashboard-container">

                {/* Student Name */}

                <h1>{user.fullName}</h1>

                <p className="dashboard-subtitle">
                    SkillBridge Student Profile
                </p>


                {/* Skills They Can Teach */}

                <div className="dashboard-card">

                    <h2>
                        Skills I Can Teach
                    </h2>

                    <p className="profile-skill-text">
                        {user.skillsToTeach ||
                            "No skills added."}
                    </p>

                </div>


                {/* Skills They Want To Learn */}

                <div className="dashboard-card">

                    <h2>
                        Skills I Want to Learn
                    </h2>

                    <p className="profile-skill-text">
                        {user.skillsToLearn ||
                            "No skills added."}
                    </p>

                </div>


                {/* Uploaded Skill Content */}

                <div className="dashboard-card">

                    <h2>
                        Skill Content Shared
                    </h2>

                    {posts.length === 0 ? (

                        <p className="no-profile-posts">
                            This student has not uploaded
                            any skill content yet.
                        </p>

                    ) : (

                        <div className="profile-posts">

                            {posts.map((post) => (

                                <div
                                    className="profile-post"
                                    key={post.id}
                                >

                                    <h3>
                                        {post.title}
                                    </h3>

                                    <p className="post-skill">

                                        <strong>
                                            Skill:
                                        </strong>{" "}

                                        {post.skill}

                                    </p>

                                    <p className="post-description">

                                        <strong>
                                            Description:
                                        </strong>{" "}

                                        {post.description}

                                    </p>

                                </div>

                            ))}

                        </div>

                    )}

                </div>


                {/* Connect Section */}

                <div className="dashboard-card">

                    <h2>
                        Connect
                    </h2>

                    <p>
                        Send a connection request to learn
                        and share skills.
                    </p>

                    <button
                        className="form-button"
                        onClick={handleConnectionRequest}
                    >
                        Send Connection Request
                    </button>

                    {message && (

                        <p className="profile-message">
                            {message}
                        </p>

                    )}

                </div>

            </div>

        </div>

    );
}

export default Profile;