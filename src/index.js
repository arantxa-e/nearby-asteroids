import React from 'react';
import ReactDOM from 'react-dom';
import './Normalize.css';
import './App.css';
import {Navbar} from './Navbar';
import {Asteroid} from './Asteroid';

class Neows extends React.Component {
    state = {
        data: [],
        loading: false,
        day: '',
        error: false
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    collectDay = (e) => {
        // setting the start date in the state
        this.setState({day: e.target.value})
    }

    outputDates = (e) => {
        console.log(this.state.data)
        e.preventDefault()
        let day = this.state.day
        let key = 'uglaVaRE5v6sq7B6x7tskfi7GPjYpIIfwyH3w90u'
        this.setState({loading: true, error: false})

        if (day) {
            fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${day}&end_date=${day}&api_key=${key}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error(response.statusText)
                    }
                })
                .then(response => this.setState({data: response.near_earth_objects[day]}))
                .then(this.setState({loading: false}))
                .catch(error => console.log(error))
        } else {
            this.setState({error: true})
        }
    }
    
    render() {
        return (
            <>
                <Navbar />

                <div className="container">

                    <form onSubmit={this.outputDates}>
                        <h1>Nearby Asteroids</h1>
                        <p>
                            This handy little tool displays nearby asteroids based on the 
                            day you select. Be one of the first to know if a dangerous asteroid 
                            is heading our way.
                        </p>
                        <p>
                            This site was made using NASA's <a href="https://api.nasa.gov/" target="_blank" rel="noopener noreferrer">
                            NeoWs (Near Earth Object Web Service)</a>.
                        </p>

                        <div className="user-input">
                            {this.state.error && ('Please select a date and then try again')}
                            <label>
                                Enter Day
                                <br />
                                <input type="date" onChange={this.collectDay}></input>
                            </label>
                            <button type="submit" className="button-primary">Submit</button>
                        </div>

                    </form>

                    <div>
                        <div className="results">{this.state.data.length >= 1 ? `Returned ${this.state.data.length} results` : ''}</div>
                        <br />
                        {this.state.data.map(
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
            </>
        )
    }
}

ReactDOM.render(<Neows />, document.getElementById('root'));