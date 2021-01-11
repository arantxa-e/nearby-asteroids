import React from 'react'
import AsteroidHero from '../img/asteroid-hero.svg'

const Header = () => {
    return (
        <>
            <section className="hero dark-hero">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-vcentered">
                            <div className="column has-text-centered">
                                <img src={AsteroidHero} alt="Nearby Asteroids" class="header-img" />
                            </div>
                            <div className="column">
                                <h1 className="title is-1">
                                    Nearby Asteroids
                                </h1>
                                <h2 className="subtitle">
                                    This handy little tool displays nearby asteroids based on the 
                                    day you select. Be one of the first to know if a dangerous asteroid 
                                    is heading our way. <br />
                                        This site was made using NASA's <a href="https://api.nasa.gov/" target="_blank" rel="noopener noreferrer">
                                    NeoWs (Near Earth Object Web Service)</a>.
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Header;