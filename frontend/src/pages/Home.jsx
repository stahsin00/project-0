import React from "react";

function About() {
    return (
        <div>
            <section class="section">
                <h2>Features</h2>
                <div class="card">
                <h3 class="card-title">Easy-to-Use Interface</h3>
                <p>Our platform helps you refine your ideas effortlessly.</p>
                <a href="#">Learn More</a>
                </div>

                <div class="card">
                <h3 class="card-title">AI-Driven Pitch Builder</h3>
                <p>Turn your rough notes into a polished pitch with AI support.</p>
                <a href="#">Get Started</a>
                </div>
            </section>

            <section>
                <h2>Try It Now</h2>
                <form>
                <label for="name">Name:</label>
                {/* <input type="text" id="name" name="name" placeholder="Enter your name"> */}

                <label for="message">Pitch Idea:</label>
                <textarea id="message" name="message" placeholder="Share your rough ideas"></textarea>

                <button type="submit">Submit Pitch</button>
                </form>
            </section>
        </div>
    );
}

export default About;