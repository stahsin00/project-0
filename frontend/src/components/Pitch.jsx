import { React, useState } from "react";

function About() {
    const [name, setName] = useState("");

    return (
        <div>
            <section className="section">
                <h2>Features</h2>
                <div className="card">
                    <h3 className="card-title">Easy-to-Use Interface</h3>
                    <p>Our platform helps you refine your ideas effortlessly.</p>
                    <a href="#">Learn More</a>
                </div>

                <div className="card">
                    <h3 className="card-title">AI-Driven Pitch Builder</h3>
                    <p>Turn your rough notes into a polished pitch with AI support.</p>
                    <a href="#">Get Started</a>
                </div>
            </section>

            <section>
                <h2>Try It Now</h2>
                <form>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="message">Pitch Idea:</label>
                    <textarea id="message" name="message" placeholder="Share your rough ideas"></textarea>
                    <button type="submit" className="w-full h-full bg-pink-200 text-white px-4 py-2 rounded-lg">Submit Pitch</button>
                </form>
            </section>
        </div>
    );
}

export default About;