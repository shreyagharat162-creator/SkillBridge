import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Connections() {

    const navigate = useNavigate();

    const [connections, setConnections] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadConnections = async () => {

            const savedUser = localStorage.getItem("user");

            if (!savedUser) {
                setMessage("Please login first.");
                setLoading(false);
                return;
            }

            const currentUser = JSON.parse(savedUser);

            try {

                const receivedResponse = await fetch(
                    `http://localhost:8080/api/requests/received/${currentUser.id}`
                );

                const sentResponse = await fetch(
                    `http://localhost:8080/api/requests/sent/${currentUser.id}`
                );

                if (!receivedResponse.ok || !sentResponse.ok) {
                    throw new Error("Unable to load connections.");
                }

                const receivedRequests =
                    await receivedResponse.json();

                const sentRequests =
                    await sentResponse.json();

                const acceptedConnections = [];

                // Requests received by current user
                receivedRequests
                    .filter(
                        (request) =>
                            request.status === "ACCEPTED"
                    )
                    .forEach((request) => {

                        if (request.senderId) {

                            acceptedConnections.push({
                                id: request.senderId,
                                name: request.senderName
                            });

                        }

                    });


                // Requests sent by current user
                sentRequests
                    .filter(
                        (request) =>
                            request.status === "ACCEPTED"
                    )
                    .forEach((request) => {

                        if (request.receiverId) {

                            acceptedConnections.push({
                                id: request.receiverId,
                                name: request.receiverName
                            });

                        }

                    });


                // Remove duplicate connections
                const uniqueConnections =
                    acceptedConnections.filter(
                        (connection, index, self) =>
                            index ===
                            self.findIndex(
                                (item) =>
                                    item.id === connection.id
                            )
                    );

                setConnections(uniqueConnections);

            } catch (error) {

                console.error(
                    "Error loading connections:",
                    error
                );

                setMessage(
                    "Cannot connect to the server."
                );

            } finally {

                setLoading(false);

            }
        };

        loadConnections();

    }, []);


    if (loading) {

        return (
            <main className="connections-page">

                <section className="connections-content">

                    <div className="empty-connections">

                        <div className="empty-connections-icon">
                            ⏳
                        </div>

                        <h2>
                            Loading Connections...
                        </h2>

                        <p>
                            Please wait while we load your connections.
                        </p>

                    </div>

                </section>

            </main>
        );

    }


    return (

        <main className="connections-page">

            <section className="connections-hero">

                <div className="connections-hero-overlay">

                    <div className="connections-header">

                        <div className="connections-icon">
                            🤝
                        </div>

                        <h1>
                            My Connections
                        </h1>

                        <p>
                            People you are connected with
                        </p>

                    </div>

                </div>

            </section>


            <section className="connections-content">

                {message && (
                    <div className="connections-message">
                        {message}
                    </div>
                )}


                {connections.length === 0 ? (

                    <div className="empty-connections">

                        <div className="empty-connections-icon">
                            🤝
                        </div>

                        <h2>
                            No Connections Yet
                        </h2>

                        <p>
                            Your accepted connections will appear here.
                        </p>

                        <button
                            className="form-button"
                            onClick={() => navigate("/explore")}
                        >
                            Explore Skills
                        </button>

                    </div>

                ) : (

                    <div className="connections-grid">

                        {connections.map((connection) => (

                            <div
                                className="connection-card"
                                key={connection.id}
                            >

                                <div className="connection-avatar">
                                    👨‍🎓
                                </div>

                                <h2>
                                    {connection.name}
                                </h2>

                                <p className="connection-status">
                                    ✓ Connected
                                </p>

                                <div className="connection-actions">

                                    <button
                                        className="view-profile-button"
                                        onClick={() =>
                                            navigate(
                                                `/profile/${connection.id}`
                                            )
                                        }
                                    >
                                        View Profile
                                    </button>

                                    <button
                                        className="message-button"
                                        onClick={() =>
                                            navigate(
                                                `/messages/${connection.id}`
                                            )
                                        }
                                    >
                                        💬 Message
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </main>

    );
}

export default Connections;