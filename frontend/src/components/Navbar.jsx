import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState(
        localStorage.getItem("user") !== null
    );

    useEffect(() => {

        const checkLogin = () => {
            setLoggedIn(localStorage.getItem("user") !== null);
        };

        window.addEventListener("storage", checkLogin);

        return () => {
            window.removeEventListener("storage", checkLogin);
        };

    }, []);

    const handleLogout = () => {

        localStorage.removeItem("user");

        setLoggedIn(false);

        navigate("/login");
    };

    return (

        <nav className="navbar">

            <div className="navbar-logo">
                <Link to="/">
                    SkillBridge
                </Link>
            </div>

            <div className="navbar-links">

                <Link to="/">
                    Home
                </Link>

                <Link to="/explore">
                    Explore Skills
                </Link>

                <Link to="/upload-skill">
                    Upload Skill
                </Link>

                <Link to="/requests">
                    Requests
                </Link>

                {loggedIn && (
                    <Link to="/connections">
                        Connections
                    </Link>
                )}

                <Link to="/about">
                    About
                </Link>

                <Link to="/contact">
                    Contact Us
                </Link>

                <div className="login-section">

                    {!loggedIn ? (

                        <Link to="/login">
                            Login
                        </Link>

                    ) : (

                        <button
                            className="navbar-logout"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    )}

                </div>

            </div>

        </nav>

    );
}

export default Navbar;