import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../api";
function Messages() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(null);
    const [otherUser, setOtherUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    // Get logged-in user
    useEffect(() => {
        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
            navigate("/login");
            return;
        }

        setCurrentUser(JSON.parse(savedUser));
    }, [navigate]);


    // Get the other student's profile
    useEffect(() => {
        const loadOtherUser = async () => {
            try {
                const response = await fetch(
                   `${API_URL}/api/users/${id}`
                );

                if (!response.ok) {
                    throw new Error("Unable to load user.");
                }

                const data = await response.json();
                setOtherUser(data);

            } catch (error) {
                console.error("Error loading user:", error);
                setMessage("Unable to load student profile.");
            }
        };

        if (id) {
            loadOtherUser();
        }
    }, [id]);


    // Load conversation
    const loadMessages = async () => {
        if (!currentUser || !id) {
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/api/messages/conversation?userId=${currentUser.id}&otherUserId=${id}`
            );

            if (response.status === 403) {
                setMessage(
                    "You can message this student only after the connection is accepted."
                );
                setMessages([]);
                return;
            }

            if (!response.ok) {
                throw new Error("Unable to load messages.");
            }

            const data = await response.json();

            setMessages(data);
            setMessage("");

        } catch (error) {
            console.error("Error loading messages:", error);
            setMessage("Cannot connect to the server.");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadMessages();
    }, [currentUser, id]);


    // Send message
    const handleSend = async (event) => {
        event.preventDefault();

        if (!content.trim()) {
            return;
        }

        if (!currentUser) {
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/api/messages?senderId=${currentUser.id}&receiverId=${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        content: content
                    })
                }
            );

            if (!response.ok) {
                setMessage(
                    "Message could not be sent. Make sure you are connected."
                );
                return;
            }

            setContent("");
            setMessage("");

            // Reload conversation after sending
            loadMessages();

        } catch (error) {
            console.error("Error sending message:", error);
            setMessage("Cannot connect to the server.");
        }
    };


    // Delete message
    const handleDeleteMessage = async (messageId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this message?"
        );

        if (!confirmDelete) {
            return;
        }

        if (!currentUser) {
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/api/messages/${messageId}?userId=${currentUser.id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                setMessage("You can delete only your own messages.");
                return;
            }

            setMessage("");

            // Reload conversation after deleting
            loadMessages();

        } catch (error) {
            console.error("Error deleting message:", error);
            setMessage("Cannot connect to the server.");
        }
    };


    if (loading) {
        return (
            <div className="messages-page">
                <div className="messages-loading">
                    Loading chat...
                </div>
            </div>
        );
    }


    return (
        <div className="messages-page">

            <div className="messages-container">

                {/* Chat Header */}
                <div className="messages-header">

                    <button
                        className="back-button"
                        onClick={() => navigate("/connections")}
                    >
                        ←
                    </button>

                    <div>
                        <h2>
                            {otherUser
                                ? otherUser.fullName
                                : "Student"}
                        </h2>

                        <p>SkillBridge Connection</p>
                    </div>

                </div>


                {/* Chat Messages */}
                <div className="messages-list">

                    {messages.length === 0 ? (

                        <div className="empty-chat">
                            <p>No messages yet.</p>
                            <span>
                                Start the conversation by sending a message.
                            </span>
                        </div>

                    ) : (

                        messages.map((msg) => {

                            const isSent =
                                msg.senderId === currentUser?.id;

                            return (
                                <div
                                    key={msg.id}
                                    className={
                                        isSent
                                            ? "message-row sent-row"
                                            : "message-row received-row"
                                    }
                                >

                                    <div
                                        className={
                                            isSent
                                                ? "message-bubble sent"
                                                : "message-bubble received"
                                        }
                                    >

                                        <p>{msg.content}</p>

                                        <span className="message-time">
                                            {msg.timestamp
                                                ? new Date(
                                                    msg.timestamp
                                                ).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })
                                                : ""}
                                        </span>

                                        {/* Delete button only for your messages */}
                                        {isSent && (
                                            <button
                                                className="delete-message-button"
                                                onClick={() =>
                                                    handleDeleteMessage(msg.id)
                                                }
                                                title="Delete message"
                                            >
                                                🗑️
                                            </button>
                                        )}

                                    </div>

                                </div>
                            );
                        })

                    )}

                </div>


                {/* Error / Information Message */}
                {message && (
                    <p className="chat-message">
                        {message}
                    </p>
                )}


                {/* Message Input */}
                <form
                    className="message-input-area"
                    onSubmit={handleSend}
                >

                    <input
                        type="text"
                        value={content}
                        onChange={(event) =>
                            setContent(event.target.value)
                        }
                        placeholder="Type a message..."
                    />

                    <button type="submit">
                        Send
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Messages;