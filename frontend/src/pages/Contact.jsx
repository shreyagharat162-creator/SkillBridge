import { useState } from "react";

function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setSuccessMessage(
            "Thank you for contacting SkillBridge! We will get back to you soon."
        );

        setFormData({
            name: "",
            email: "",
            message: ""
        });
    };

    return (
        <main className="contact-page">

            <section className="contact-hero">

                <div className="contact-hero-overlay">

                    <div className="contact-header">

                        <div className="contact-icon">
                            
                        </div>

                        <h1>Contact Us</h1>

                        <p>
                            Have a question or need help?
                            Get in touch with us.
                        </p>

                    </div>

                </div>

            </section>


            <section className="contact-content">

                <div className="contact-container">

                    <h2>Send Us a Message</h2>

                    <p className="contact-description">
                        We would love to hear from you.
                        Fill in the form below and send us your message.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>Name</label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                            />

                        </div>


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


                        <div className="form-group">

                            <label>Message</label>

                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Enter your message"
                                rows="6"
                                required
                            />

                        </div>


                        <button
                            type="submit"
                            className="contact-submit"
                        >
                            Send Message
                        </button>

                    </form>


                    {successMessage && (
                        <div className="contact-success">
                            ✓ {successMessage}
                        </div>
                    )}

                </div>

            </section>

        </main>
    );
}

export default Contact;