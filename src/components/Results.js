import React, { useContext } from 'react'
import Asteroid from './Asteroid';
import Spinner from './Spinner';
import Error from './Error';
import { AsteroidsContext } from '../context/AsteroidsContext';

const Results = () => {
    const { asteroids, loading, error } = useContext(AsteroidsContext);

    return (
        <section className="section">
            <div className="container">
                { loading ? <Spinner />  : 
                    <>                  
                        {error ? <Error /> : 
                            <div className="columns is-multiline is-variable is-8">
                                { asteroids.length ?
                                    asteroids.map(
                                        (data, i) =>       
                                            <Asteroid
                                                key={i}
                                                data={data}
                                            />
                                    ) :
                                    <Error empty="true" />
                                }
                            </div>
                        }      
                    </>
                }
            </div>
        </section> 
    )
}

export default Results;