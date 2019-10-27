import React from 'react';

export const Navbar = () => {
    return(
        <nav>
            <div className="container">
                <div className="brand">Nearby Asteroids</div>

                <div className="nav-links">
                    <a href="https://github.com/arantxa-e/nearby-asteroids" target="_blank"
                        rel="noopener noreferrer">View on Github</a>
                    <a href="http://arantxaedwards.com/works">Other Projects</a>
                </div>
            </div>
        </nav>
    )
}