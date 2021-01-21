import React, { useState, useEffect, useContext } from 'react'
import {useStateWithCallbackLazy } from 'use-state-with-callback';
import { AsteroidsContext } from '../context/AsteroidsContext'
import Filters from './Filters'

const DateInput = () => {
    const [day, setDay] = useStateWithCallbackLazy(''); /* stores date used for retrieving */

    const { asteroids, setAsteroids, setLoading, setError } = useContext(AsteroidsContext);

    const key = 'uglaVaRE5v6sq7B6x7tskfi7GPjYpIIfwyH3w90u';

    /* fetch data from API */
    const fetchData = (e) => {
        setLoading(true);
        fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${e}&end_date=${e}&api_key=${key}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText)
            }
        })
        .then(response => {
                setAsteroids(response.near_earth_objects[e]);
                setLoading(false);
            }
        )
        .catch(error => {
            console.log(error);
            setLoading(false);
            setError(true);
        })
    }

    /* retrieves today's data on initial render */
    useEffect(() => {
        console.log(asteroids);
        let date = new Date();
        let dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
            .toISOString()
            .split("T")[0];
        setDay(dateString, (e) => fetchData(e));
    }, [])

    /* set chosen date in state */
    const collectDay = (e) => { 
        setDay(e.target.value, (e) => fetchData(e));
    }
    
    /* fetch data on submit */
    const outputDates = (e) => {
        e.preventDefault()
        fetchData(day);
    }

    return (
        <>
            <section className="section select-date">
                <div className="container">
                    <form onSubmit={outputDates}>
                        <div className="user-input py-5">            
                            <div className="results">
                                There are {asteroids.length} nearby asteroids on <input type="date" onChange={collectDay} value={day}></input>
                            </div>                  
                            <Filters />
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default DateInput;