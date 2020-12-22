import React from 'react'
import Navbar from './Navbar'

const Header = () => {
    return (
        <>
            <Navbar />
            <section class="hero is-info is-large">
                <div class="hero-body">
                    <div class="container">
                    <h1 class="title">
                      Nearby Asteroids
                    </h1>
                    <h2 class="subtitle">
                    This handy little tool displays nearby asteroids based on the 
                    day you select. Be one of the first to know if a dangerous asteroid 
                    is heading our way. <br />
                        This site was made using NASA's <a href="https://api.nasa.gov/" target="_blank" rel="noopener noreferrer">
                     NeoWs (Near Earth Object Web Service)</a>.
                    </h2>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Header;