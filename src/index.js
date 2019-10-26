import React from 'react';
import ReactDOM from 'react-dom';

class Nasa extends React.Component {
    state = {
        data: [],
        loading: false,
        start: '',
        end: '',
        error: false
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    collectStartDate = (e) => {
        this.setState({start: e.target.value})

        let date = new Date(e.target.value)

        // adding seven days to the start date
        let plusSeven = new Date(date.setDate(date.getDate() + 8))

        // adding 1 to the new month since count starts at 00
        let newMonth = plusSeven.getMonth() + 1 
        let newDate = plusSeven.getDate()
        let newYear = plusSeven.getFullYear()

        // converting month and date to mm and dd format
        if (newMonth < 10) newMonth = `0${newMonth}`
        if (newDate < 10) newDate = `0${newDate}`
        
        this.setState({end: `${newYear}-${newMonth}-${newDate}`})
    }
    


    outputDates = (e) => {
        e.preventDefault()
        let start = this.state.start
        let end = this.state.end
        let key = 'uglaVaRE5v6sq7B6x7tskfi7GPjYpIIfwyH3w90u'

        if (start && end) {
            this.setState({loading: true, error: false})
            fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${key}`)
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
                    <h1>Nasa Space Stuff goes here</h1>

                    {(this.state.error ? 'Please select a start and end date then try again' : 'Successful')}

                    <br />

                    <label>
                        From
                        <input type="date" id="from-date" onChange={this.collectStartDate}></input>
                    </label>
    
                    <br />
    
                    <label>
                        To
                        
                    </label>
    
                    <br />
    
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<Nasa />, document.getElementById('root'));