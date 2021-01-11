import React, { useContext } from 'react'
import Asteroid from './Asteroid';
import Spinner from './Spinner';
import { AsteroidsContext } from '../context/AsteroidsContext';

const Results = () => {
    const { asteroids, loading } = useContext(AsteroidsContext);

    return (
        <section className="section">
            <div className="container">
                { loading ? <Spinner />  : 
                    <>  
                        <div className="columns is-multiline is-variable is-8">
                            {asteroids.map(
                                (data, i) =>       
                                    <Asteroid
                                        key={i}
                                        data={data}
                                    />
                            )}
                        </div>
                    </>
                }
            </div>
        </section> 
    )
}

export default Results;