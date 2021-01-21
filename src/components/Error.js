import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSatellite } from '@fortawesome/free-solid-svg-icons'

const Error = ({empty}) => {
    return (
            <div className="column asteroid p-5 has-text-centered">
                {empty ? 
                    <>
                        <FontAwesomeIcon icon={faSatellite} size="5x" />
                        <h2 class="my-5 is-size-4 has-text-centered">No Asteroids Found</h2>
                        <p class="has-text-centered">There were no nearby asteroids found for the date you selected. Please select another date.</p>
                    </>
                    :
                    <>
                        <FontAwesomeIcon icon={faSatellite} size="5x" />
                        <h2 class="my-5 is-size-4 has-text-centered">Oops</h2>
                        <p class="has-text-centered">There was an error retrieving the asteroids. Please try again later.</p>
                    </>
                }
                
            </div>
    )
}

export default Error;