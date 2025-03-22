import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <nav className="footer bg-muted-teal py-3">
            <p className="mb-3">&copy; 2025 PitchMint. All rights reserved.</p>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    );
};

export default Footer;
