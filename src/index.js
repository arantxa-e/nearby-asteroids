import React from 'react';
import ReactDOM from 'react-dom';

const Data = ({num, name, url, feetMin, feetMax, hazard, approach, velocity}) => {
    return(
        <div>
            <h1>{num + 1}. Name: <a href={url} target="_blank" rel="noopener noreferrer">{name}</a></h1>
            <p>
                Diameter: {Math.round(feetMin)} feet - {Math.round(feetMax)} feet 
                <br />
                Hazard level: {hazard ? 'Hazardous' : 'Not hazardous'}
                <br />
                Approach date: {approach}
                <br />
                Velocity: {Math.round(velocity)} miles per hour
                

            </p>
        </div>
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
            <div>
                <form onSubmit={this.outputDates}>
                    <h1>Nasa Space Stuff</h1>
                    Loading: {(this.state.error ? 'Loading...' : 'Done')}
                    <br />
                    Error: {(this.state.error ? 'Please select a start and end date then try again' : 'Successful')}
                    <br />
                    <label>
                        Day
                        <br />
                        <input type="date" onChange={this.collectDay}></input>
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>

                <div>
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