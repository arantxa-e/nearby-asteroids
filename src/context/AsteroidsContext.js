import React, { createContext, useState } from 'react'

export const AsteroidsContext = createContext();

export const AsteroidsProvider = ({children}) => {
    const [asteroids, setAsteroids] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [diameterUnit, setDiameterUnit] = useState(['kilometers', 'km']); // kilometers, meters, miles, feet
    const [velocityUnit, setVelocityUnit] = useState(['kilometers_per_second', 'kps']); // kilometers_per_second, kilometers_per_hour, miles_per_hour
    const [distanceUnit, setDistanceUnit] = useState(['lunar', 'LD']); // astronomical, lunar, kilometers, miles
    return ( 
        <AsteroidsContext.Provider value={{ 
            asteroids, setAsteroids, 
            loading, setLoading, 
            error, setError,
            diameterUnit, setDiameterUnit, 
            velocityUnit, setVelocityUnit, 
            distanceUnit, setDistanceUnit 
        }}>
            {children}
        </AsteroidsContext.Provider>
    )
}