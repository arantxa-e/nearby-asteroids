import React, { useState } from 'react'
import Asteroid from './Asteroid'

const DateInput = () => {
    const [day, setDay] = useState(''); /* stores date used for retrieving */
    const [loading, setLoading] = useState(false); /* used to display loading spinner */
    const [data, setData] = useState([]); /* stores data retrieved from NASA API */
    const [error, setError] = useState(false); /* used to display any error messages */

    const collectDay = (e) => { // setting the start date in the state
        setDay(e.target.value)
    }
    
    const outputDates = (e) => {
        e.preventDefault()
        let key = 'uglaVaRE5v6sq7B6x7tskfi7GPjYpIIfwyH3w90u';
        if (day) {
            fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${day}&end_date=${day}&api_key=${key}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.statusText)
                }
            })
            .then(response => setData(response.near_earth_objects[day]))
            .catch(error => console.log(error))
        } 
    }

    return (
        <div>
          <form onSubmit={outputDates}>
                <div className="user-input">
                    {error && ('Please select a date and then try again')}
                    <label>
                        Enter Day
                        <br />
                        <input type="date" onChange={collectDay}></input>
                    </label>
                    <button type="submit" className="button-primary">Submit</button>
                </div>
            </form>
            <div>
                <div className="results">{data.length >= 1 ? `Returned ${data.length} results` : ''}</div>
                <br />
                {data.map(
                    (data, i) => 
                    
                        <Asteroid
                            key={i}
                            num={i}
                            name={data.name} 
                            url={data.nasa_jpl_url}
                            feetMin={data.estimated_diameter.feet.estimated_diameter_min}
                            feetMax={data.estimated_diameter.feet.estimated_diameter_max}
                            hazard={data.is_potentially_hazardous_asteroid}
                            velocity={data.close_approach_data[0].relative_velocity.miles_per_hour}
                        />

                )}
            </div>
        </div>
    )
}

export default DateInput;