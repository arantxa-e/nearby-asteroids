import React from 'react';

const Asteroid = ({num, name, url, feetMin, feetMax, hazard, velocity}) => {
    return(
        <>
            <div className="float">
                <div className="inner-float">
                    <h2 className="name">{num + 1}. <a href={url} target="_blank" rel="noopener noreferrer">{name}</a></h2>
                    <p>
                        Diameter: {Math.round(feetMin)} feet - {Math.round(feetMax)} feet 
                        <br />
                        Hazard level: {hazard ? 'Hazardous' : 'Not hazardous'}
                        <br />
                        Velocity: {Math.round(velocity)} miles per hour
                    </p>
                </div>
            </div>
        </>
    )
}

export default Asteroid;