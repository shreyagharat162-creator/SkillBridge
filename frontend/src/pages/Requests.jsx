import { useEffect, useState } from "react";

function Requests() {

    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState("");
    const [contactInfo, setContactInfo] = useState({});
    const [loadingContact, setLoadingContact] = useState(null);

    const loadRequests = async () => {

        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
            setMessage("Please login first.");
            return;
        }

        const user = JSON.parse(savedUser);

        try {

            const response = await fetch(
                `http://localhost:8080/api/requests/received/${user.id}`
            );

            if (response.ok) {

                const data = await response.json();

                setRequests(data);

            } else {

                setMessage(
                    "Unable to load connection requests."
                );
            }

        } catch (error) {

            console.error("Error:", error);

            setMessage(
                "Cannot connect to the server."
            );
        }
    };

    useEffect(() => {
        loadRequests();
    }, []);

    const updateRequest = async (requestId, action) => {

        try {

            const response = await fetch(
                `http://localhost:8080/api/requests/${requestId}/${action}`,
                {
                    method: "PUT"
                }
            );

            if (response.ok) {

                if (action === "accept") {

                    setMessage(
                        "Connection request accepted!"
                    );

                } else {

                    setMessage(
                        "Connection request rejected!"
                    );
                }

                loadRequests();

            } else {

                setMessage(
                    "Unable to update the request."
                );
            }

        } catch (error) {

            console.error("Error:", error);

            setMessage(
                "Cannot connect to the server."
            );
        }
    };

    const handleConnect = async (request) => {

        setLoadingContact(request.id);

        try {

            const response = await fetch(
                `http://localhost:8080/api/requests/${request.id}/contact`
            );

            if (response.ok) {

                const data = await response.json();

                setContactInfo({
                    ...contactInfo,
                    [request.id]: data
                });

            } else {

                setMessage(
                    "Contact information is available only after the request is accepted."
                );
            }

        } catch (error) {

            console.error("Error:", error);

            setMessage(
                "Cannot connect to the server."
            );

        } finally {

            setLoadingContact(null);
        }
    };

    return (

        <main className="requests-page">

            {/* Header */}

            <section className="requests-hero">

                <div className="requests-hero-overlay">

                    <div className="requests-header">

                        <div className="requests-icon">
                            🤝
                        </div>

                        <h1>
                            Connection Requests
                        </h1>

                        <p>
                            Manage connection requests from
                            other SkillBridge students.
                        </p>

                    </div>

                </div>

            </section>


            {/* Requests Content */}

            <section className="requests-content">

                {message && (
                    <div className="requests-message">
                        {message}
                    </div>
                )}


                {requests.length === 0 ? (

                    <div className="empty-requests">

                        <div className="empty-icon">
                            🤝
                        </div>

                        <h2>
                            No Connection Requests
                        </h2>

                        <p>
                            You don't have any connection requests
                            at the moment.
                        </p>

                    </div>

                ) : (

                    <div className="requests-list">

                        {requests.map((request) => (

                            <div
                                className="request-card"
                                key={request.id}
                            >

                                {/* Student Header */}

                                <div className="request-student">

                                    <div className="student-avatar">
                                        👨‍🎓
                                    </div>

                                    <div>

                                        <h2>
                                            {request.senderName}
                                        </h2>

                                        <p>
                                            wants to connect
                                            with you
                                        </p>

                                    </div>

                                </div>


                                {/* Status */}

                                <div className="request-status">

                                    <span>
                                        Status
                                    </span>

                                    <strong
                                        className={`status-${request.status.toLowerCase()}`}
                                    >
                                        {request.status}
                                    </strong>

                                </div>


                                {/* Pending */}

                                {request.status === "PENDING" && (

                                    <div className="request-actions">

                                        <button
                                            className="accept-button"
                                            onClick={() =>
                                                updateRequest(
                                                    request.id,
                                                    "accept"
                                                )
                                            }
                                        >
                                            ✓ Accept
                                        </button>

                                        <button
                                            className="reject-button"
                                            onClick={() =>
                                                updateRequest(
                                                    request.id,
                                                    "reject"
                                                )
                                            }
                                        >
                                            ✕ Reject
                                        </button>

                                    </div>

                                )}


                                {/* Accepted */}

                                {request.status === "ACCEPTED" && (

                                    <div className="accepted-section">

                                        <p className="accepted-text">
                                            ✓ You are now connected
                                            with {request.senderName}.
                                        </p>

                                        <button
                                            className="connect-button"
                                            onClick={() =>
                                                handleConnect(request)
                                            }
                                        >
                                            Connect with{" "}
                                            {request.senderName}
                                        </button>


                                        {loadingContact === request.id && (

                                            <p className="loading-contact">
                                                Loading contact
                                                information...
                                            </p>

                                        )}


                                        {contactInfo[request.id] && (

                                            <div className="contact-box">

                                                <h3>
                                                    Contact Information
                                                </h3>

                                                <p>
                                                    <strong>
                                                        Email:
                                                    </strong>{" "}
                                                    {
                                                        contactInfo[
                                                            request.id
                                                        ].email
                                                    }
                                                </p>


                                                {contactInfo[
                                                    request.id
                                                ].phoneNumber && (

                                                    <p>
                                                        <strong>
                                                            Phone:
                                                        </strong>{" "}
                                                        {
                                                            contactInfo[
                                                                request.id
                                                            ].phoneNumber
                                                        }
                                                    </p>

                                                )}

                                            </div>

                                        )}

                                    </div>

                                )}


                                {/* Rejected */}

                                {request.status === "REJECTED" && (

                                    <div className="rejected-section">

                                        <p>
                                            This connection request
                                            was rejected.
                                        </p>

                                    </div>

                                )}

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </main>
    );
}

export default Requests;