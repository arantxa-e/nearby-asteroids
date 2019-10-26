import React from 'react';
import ReactDOM from 'react-dom';

class Nasa extends React.Component {
    state = {
        data: [],
        loading: false
    }

    outputDates = (e) => {
        e.preventDefault()
        this.setState({loading: true})
        fetch('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=uglaVaRE5v6sq7B6x7tskfi7GPjYpIIfwyH3w90u')
            .then(response => (
                response.ok 
                    ? this.setState({data: response.json()}) 
                    : new Error(response.statusText)
                ))
            .then(
                console.log(this.state.data),
                this.setState({loading: false})
            )
    }

    render() {
        return (
            <div>
                <form onSubmit={this.outputDates}>
                    <h1>Nasa Space Stuff goes here</h1>
                    {(this.state.loading ? 'loading...' : 'finished loading...')}
                    <label>
                        From
                        <input type="date" id="from-date"></input>
                    </label>
    
                    <br />
    
                    <label>
                        To
                        <input type="date" id="to-date"></input>
                    </label>
    
                    <br />
    
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<Nasa />, document.getElementById('root'));