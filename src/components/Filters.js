import React, { useContext } from 'react'
import { AsteroidsContext } from '../context/AsteroidsContext'

const Filters = () => {
    const { 
        diameterUnit, setDiameterUnit, 
        velocityUnit, setVelocityUnit, 
        distanceUnit, setDistanceUnit 
    } = useContext(AsteroidsContext);

    const diameterChange = (e) => {
        switch(e.target.value) {
            case 'meters':
                setDiameterUnit(['meters', 'meters']);
                break;
            case 'miles':
                setDiameterUnit(['miles', 'miles']);
                break;
            case 'ft':
                setDiameterUnit(['feet', 'ft']);
                break;
            default:
                setDiameterUnit(['kilometers', 'km']);
        }
    }

    const velocityChange = (e) => {
        switch(e.target.value) {
            case 'kph':
                setVelocityUnit(['kilometers_per_hour', 'kph']);
                break;
            case 'mph':
                setVelocityUnit(['miles_per_hour', 'mph']);
                break;
            default:
                setVelocityUnit(['kilometers_per_second', 'kps']);
        }
    }

    const distanceChange = (e) => {
        switch(e.target.value) {
            case 'AU':
                setDistanceUnit(['astronomical', 'AU']);
                break;
            case 'LD':
                setDistanceUnit(['lunar', 'LD']);
                break;
            case 'miles':
                setDistanceUnit(['miles', 'miles']);
                break;
            default:
                setDistanceUnit(['kilometers', 'km']);
        }
    }

    return (
        <div>
            <div class="filter diameter">
                <label for="diameter">Diameter Units</label>
                <select value={diameterUnit[1]} onChange={diameterChange} id="diameter">
                    <option value="km">Kilometers</option>
                    <option value="meters">Meters</option>
                    <option value="miles">Miles</option>
                    <option value="ft">Feet</option>
                </select>
            </div>

            <div class="filter velocity">
                <label for="velocity">Velocity Units</label>
                <select value={velocityUnit[1]} onChange={velocityChange} id="velocity">
                    <option value="kps">Kilometers Per Second</option>
                    <option value="kph">Kilometers Per Hour</option>
                    <option value="mph">Miles Per Hour</option>
                </select>
            </div>

            <div class="filter distance">
                <label for="distance">Distance Units</label>
                <select value={distanceUnit[1]} onChange={distanceChange} id="distance">
                    <option value="km">Kilometers</option>
                    <option value="miles">Miles</option>
                    <option value="AU">Astronomical Unit</option>
                    <option value="LD">Lunar Distance</option>
                </select>
            </div>

        </div>
    )
}

export default Filters;