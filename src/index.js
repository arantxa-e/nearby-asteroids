import React from 'react';
import ReactDOM from 'react-dom';
import './Normalize.css';
import './App.css';

const Data = ({num, name, url, feetMin, feetMax, hazard, approach, velocity}) => {
    let open = ''
    let close = ''

    if (num % 3 === 0) {
        open = '<div className="row">';
    } else if (num % 3 === 2) {
        close = '</div>'
    } // not working

    return(
        <>
            {open}
                <div className="one-third column">
                    <h2 className="name">{num + 1}. <a href={url} target="_blank" rel="noopener noreferrer">{name}</a></h2>
                    <p>
                        Diameter: {Math.round(feetMin)} feet - {Math.round(feetMax)} feet 
                        <br />
                        Hazard level: {hazard ? 'Hazardous' : 'Not hazardous'}
                        <br />
                        Approach date: {approach}
                        <br />
                        Velocity: {Math.round(velocity)} miles per hour<br />
                    </p>
                </div>
            {close}
        </>
    )
}

class Nasa extends React.Component {
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
                    {(this.state.error ? 'Loading...' : '')}
                    {(this.state.error ? 'Please select a start and end date then try again' : '')}
                    <label>
                        Day
                        <br />
                        <input type="date" onChange={this.collectDay}></input>
                    </label>
                    <br />
                    <button type="submit" className="button-primary">Submit</button>
                </form>

                <div>
                    {this.state.data ? `Returned ${this.state.data.length} results` : ''}
                    <br />
                    {this.state.data.map(
                        (data, i) => 
                            <Data 
                                key={i}
                                num={i}
                                name={data.name} 
                                url={data.nasa_jpl_url}
                                feetMin={data.estimated_diameter.feet.estimated_diameter_min}
                                feetMax={data.estimated_diameter.feet.estimated_diameter_max}
                                hazard={data.is_potentially_hazardous_asteroid}
                                approach={data.close_approach_data[0].close_approach_date}
                                velocity={data.close_approach_data[0].relative_velocity.miles_per_hour}
                            />
                    )}
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Nasa />, document.getElementById('root'));