import React from 'react';
import ReactDOM from 'react-dom';

// const Data = ({data, day}) => {
//     let objects = data.near_earth_objects
//     console.log(objects.data)
//     return(
//         <div>
//             logged
//         </div>
//     )
// }
// I'm stuck here


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
            .then(response => this.setState({data: response}))
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
                    {this.state.data ? <Data data={this.state.data} day={this.state.day} /> : 'awaiting data' }
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Nasa />, document.getElementById('root'));