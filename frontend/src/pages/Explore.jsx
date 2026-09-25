import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../api";

function Explore() {
    const navigate = useNavigate();

    const [skill, setSkill] = useState("");
    const [students, setStudents] = useState([]);
    const [posts, setPosts] = useState({});
    const [message, setMessage] = useState("");

    const handleSearch = async (event) => {
        event.preventDefault();

        if (!skill.trim()) {
            setMessage("Please enter a skill to search.");
            setStudents([]);
            setPosts({});
            return;
        }

        try {
            const response = await fetch(
    `${API_URL}/api/users/search?skill=${encodeURIComponent(skill.trim())}`
);

            if (response.ok) {
                const data = await response.json();

                setStudents(data);
                setMessage("");

                if (data.length === 0) {
                    setMessage("No students found for this skill.");
                    setPosts({});
                    return;
                }

                const postData = {};

                await Promise.all(
                    data.map(async (student) => {
                        try {
                            const postResponse = await fetch(
                                `${API_URL}/api/posts/user/${student.id}`
                            );

                            if (postResponse.ok) {
                                const studentPosts =
                                    await postResponse.json();

                                postData[student.id] = studentPosts;
                            } else {
                                postData[student.id] = [];
                            }
                        } catch (error) {
                            console.error(
                                "Error loading posts:",
                                error
                            );

                            postData[student.id] = [];
                        }
                    })
                );

                setPosts(postData);
            } else {
                setStudents([]);
                setPosts({});
                setMessage("Unable to search for students.");
            }
        } catch (error) {
            console.error("Error:", error);

            setStudents([]);
            setPosts({});
            setMessage("Cannot connect to the server.");
        }
    };

    const handlePopularSkill = (selectedSkill) => {
        setSkill(selectedSkill);

        const fakeEvent = {
            preventDefault: () => {}
        };

        setTimeout(() => {
            handleSearch(fakeEvent);
        }, 0);
    };

    return (
        <main className="explore-page">

            {/* Explore Header */}

            <section className="explore-hero">

                <div className="explore-overlay">

                    <div className="explore-content">

                        <h1>Explore Skills</h1>

                        <p>
                            Discover students who can teach you
                            the skills you want to learn.
                        </p>

                        {/* Search */}

                        <form
                            className="explore-search"
                            onSubmit={handleSearch}
                        >

                            <input
                                type="text"
                                value={skill}
                                onChange={(event) =>
                                    setSkill(event.target.value)
                                }
                                placeholder="Search for a skill...  Example: Java"
                            />

                            <button type="submit">
                                🔍 Search
                            </button>

                        </form>

                    </div>

                </div>

            </section>


            {/* Popular Skills */}

            <section className="popular-skills">

                <h2>Popular Skills</h2>

                <p>
                    Start exploring skills shared by students.
                </p>

                <div className="skill-buttons">

                    <button
                        onClick={() =>
                            handlePopularSkill("Java")
                        }
                    >
                        Java
                    </button>

                    <button
                        onClick={() =>
                            handlePopularSkill("Python")
                        }
                    >
                        Python
                    </button>

                    <button
                        onClick={() =>
                            handlePopularSkill("React")
                        }
                    >
                        React.js
                    </button>

                    <button
                        onClick={() =>
                            handlePopularSkill("MySQL")
                        }
                    >
                        MySQL
                    </button>

                    <button
                        onClick={() =>
                            handlePopularSkill("Web Development")
                        }
                    >
                        Web Development
                    </button>

                </div>

            </section>


            {/* Message */}

            {message && (
                <div className="explore-message">
                    {message}
                </div>
            )}


            {/* Students */}

            {students.length > 0 && (

                <section className="students-section">

                    <h2>Students Found</h2>

                    <p className="students-subtitle">
                        Students who can teach{" "}
                        <strong>{skill}</strong>
                    </p>


                    <div className="students-grid">

                        {students.map((student) => (

                            <div
                                className="student-card"
                                key={student.id}
                            >

                               {student.profileImageUrl ? (
    <img
        src={student.profileImageUrl}
        alt={student.fullName}
        className="student-profile-image"
    />
) : (
    <div className="student-icon">
        👨‍🎓
    </div>
)}

                                <h3>
                                    {student.fullName}
                                </h3>

                                <p>
                                    <strong>
                                        Can Teach:
                                    </strong>{" "}
                                    {student.skillsToTeach}
                                </p>

                                <p>
                                    <strong>
                                        Wants to Learn:
                                    </strong>{" "}
                                    {student.skillsToLearn}
                                </p>


                                {/* Uploaded Content */}

                                <div className="student-posts">

                                    <h4>
                                        Uploaded Skill Content
                                    </h4>

                                    {posts[student.id] &&
                                    posts[student.id].length > 0 ? (

                                        posts[student.id].map(
                                            (post) => (

                                                <div
                                                    className="skill-post"
                                                    key={post.id}
                                                >

                                                    <h4>
                                                        {post.title}
                                                    </h4>

                                                    <p>
                                                        <strong>
                                                            Skill:
                                                        </strong>{" "}
                                                        {post.skill}
                                                    </p>

                                                    <p>
                                                        <strong>
                                                            Description:
                                                        </strong>{" "}
                                                        {post.description}
                                                    </p>

                                                </div>

                                            )
                                        )

                                    ) : (

                                        <p className="no-posts">
                                            No uploaded content
                                            available.
                                        </p>

                                    )}

                                </div>


                                {/* View Profile */}

                                <button
                                    className="profile-button"
                                    onClick={() =>
                                        navigate(
                                            `/profile/${student.id}`
                                        )
                                    }
                                >
                                    View Profile
                                </button>

                            </div>

                        ))}

                    </div>

                </section>

            )}

        </main>
    );
}

export default Explore;