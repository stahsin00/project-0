import { React, useState } from "react";

function Features() {
    const [name, setName] = useState("");

    return (
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
                <button type="submit" className="w-50 h-full bg-dusty-blue text-white px-4 py-2 rounded-lg">Submit Pitch</button>
            </form>
        </section>
    );
}

export default Features;