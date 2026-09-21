function About() {
    return (
        <main className="about-page">

            {/* About Header */}

            <section className="about-hero">

                <div className="about-hero-overlay">

                    <div className="about-header">

                        <div className="about-icon">
                            
                        </div>

                        <h1>About SkillBridge</h1>

                        <p>
                            A student skill-sharing and connection platform.
                        </p>

                    </div>

                </div>

            </section>


            {/* About Content */}

            <section className="about-content">

                <div className="about-card">

                    <h2>What is SkillBridge?</h2>

                    <p>
                        SkillBridge is a platform designed to help students
                        connect with each other through their skills and
                        interests. Students can share the skills they can
                        teach, discover skills they want to learn, and connect
                        with other students.
                    </p>

                </div>


                <div className="about-card">

                    <h2>Problem We Solve</h2>

                    <p>
                        Students often have useful knowledge and skills but
                        may not know other students who want to learn them.
                        SkillBridge provides a simple platform where students
                        can discover suitable skill matches and connect with
                        each other.
                    </p>

                </div>


                <div className="about-card">

                    <h2>Our Objective</h2>

                    <p>
                        The main objective of SkillBridge is to create a
                        student-focused environment for knowledge sharing,
                        skill discovery, and peer-to-peer learning.
                    </p>

                </div>


                <div className="about-card">

                    <h2>How SkillBridge Works</h2>

                    <div className="steps">

                        <p>
                            <span>1</span>
                            Create an account and add your skills.
                        </p>

                        <p>
                            <span>2</span>
                            Search for a skill you want to learn.
                        </p>

                        <p>
                            <span>3</span>
                            Discover students who can teach that skill.
                        </p>

                        <p>
                            <span>4</span>
                            View their profile and uploaded skill content.
                        </p>

                        <p>
                            <span>5</span>
                            Send a connection request.
                        </p>

                        <p>
                            <span>6</span>
                            After the request is accepted, connect with the
                            student using the available contact information.
                        </p>

                    </div>

                </div>


                <div className="about-card">

                    <h2>Key Features</h2>

                    <div className="feature-list">

                        <p>✓ Student registration and login</p>
                        <p>✓ Skill search and matching</p>
                        <p>✓ Skill content sharing</p>
                        <p>✓ Student profiles</p>
                        <p>✓ Connection requests</p>
                        <p>✓ Accept or reject requests</p>
                        <p>✓ Contact sharing after connection acceptance</p>

                    </div>

                </div>


                <div className="about-card">

                    <h2>Technologies Used</h2>

                    <div className="technology-item">
                        <strong>Frontend</strong>
                        <span>React.js, JavaScript, HTML, CSS</span>
                    </div>

                    <div className="technology-item">
                        <strong>Backend</strong>
                        <span>Java, Spring Boot, REST APIs</span>
                    </div>

                    <div className="technology-item">
                        <strong>Database</strong>
                        <span>MySQL</span>
                    </div>

                    <div className="technology-item">
                        <strong>Tools</strong>
                        <span>VS Code, Maven, MySQL Workbench</span>
                    </div>

                </div>

            </section>

        </main>
    );
}

export default About;