import { React, useState } from "react";

function Features() {
    return (
        <div className="popUp mb-30 text-teal">
            <div className="the-top bg-dusty-blue">
                <ul>
                    <li className="tabBut"/>
                    <li className="tabBut"/>
                    <li className="tabBut"/>
                </ul>
            </div>
            <section className="section">
                <h2 className="my-5">Features</h2>
                <div className="card mb-5">
                    <h3 className="card-title">Easy-to-Use Interface</h3>
                    <p>Our platform helps you refine your ideas effortlessly.</p>
                    <a href="#">Learn More</a>
                </div>

                <div className="card mb-5">
                    <h3 className="card-title">AI-Driven Pitch Builder</h3>
                    <p>Turn your rough notes into a polished pitch with AI support.</p>
                    <a href="#txt">Get Started</a>
                </div>
            </section>
        </div>
    );
}

export default Features;