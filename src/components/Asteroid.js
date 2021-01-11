import React, { useState, useContext } from 'react';
import { AsteroidsContext } from '../context/AsteroidsContext'
import AsteroidImg from '../img/asteroid.svg';
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Asteroid = ({data}) => {
    const [selectedId, setSelectedId] = useState(null);
    const { diameterUnit, velocityUnit, distanceUnit } = useContext(AsteroidsContext);

    let diameter = {
        max: data.estimated_diameter[diameterUnit[0]].estimated_diameter_max,
        min: data.estimated_diameter[diameterUnit[0]].estimated_diameter_min,
        unit: diameterUnit[1]
    }

    let velocity = {
        speed: data.close_approach_data[0].relative_velocity[velocityUnit[0]],
        unit: velocityUnit[1]
    };

    let miss_distance = {
        distance: data.close_approach_data[0].miss_distance[distanceUnit[0]],
        unit: distanceUnit[1]
    }

    /* categorizing asteroid size */
    let size = data.estimated_diameter.meters.estimated_diameter_max;
    let asteroidSize;
    let asteroidImgSize;

    switch (true) {
        case (size > 1000 ):
            asteroidSize = 'very large';
            asteroidImgSize = '150px';
            break;
        case (1000 >= size && size > 300):
            asteroidSize = 'large';
            asteroidImgSize = '125px';
            break;
        case (300 >= size && size > 100):
            asteroidSize = 'medium';
            asteroidImgSize = '100px';
            break;
        case (100 >= size && size > 30):
            asteroidSize = 'small';
            asteroidImgSize = '75px';
            break;
        case (size <= 30):
            asteroidSize = 'tiny';
            asteroidImgSize = '50px';
            break;
        default: 
            asteroidSize = 'no size';
            break;
    }
    
      /* framer motion: asteroid rotation on hover */
      const asteroidMotion = {
        rest: {
            rotate: 0
        },
        hover: {
            rotate: 360,
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
            }
        }
      }

      const containerMotion = {
          rest: { 
              scale: 1
          },
          hover: {
              scale: 1.05
          }
      }

      const closeModal = () => {
        console.log(selectedId);
        setSelectedId(null)
    }

    return(
        <>
            <AnimateSharedLayout type="crossfade">
                <div className="column is-one-third is-half-tablet">
                    <motion.div 
                        initial="rest" 
                        whileHover="hover" 
                        animate="rest" 
                        className="asteroid-hover" 
                        layoutId={data.id} 
                        onClick={() => setSelectedId(data.id)}
                    >
                        <motion.div variants={containerMotion}>
                            <div className="asteroid-img">
                                <motion.img src={AsteroidImg} alt={data.name} width={asteroidImgSize} variants={asteroidMotion} />
                            </div>
                            <div className="asteroid">
                                <div className="p-5">
                                    <h2 className="asteroid-name my-5 is-size-4">{data.name}</h2>
                                    <div className="asteroid-details is-size-6">
                                        <div className="level is-mobile mb-2">
                                            <div className="level-left"><strong>Diameter</strong>:</div>
                                            <div className="level-right">
                                                {Math.round(diameter.min * 100) / 100} - 
                                                {Math.round(diameter.max * 100) / 100} {diameter.unit}
                                            </div>
                                        </div>
                                        <div className="level is-mobile mb-2">
                                            <div className="level-left"><strong>Velocity</strong>:</div>
                                            <div className="level-right">{Math.round(velocity.speed)} {velocity.unit}</div>
                                        </div>
                                        <div className="level is-mobile mb-2">
                                            <div className="level-left"><strong>Miss Distance</strong>:</div>
                                            <div className="level-right">{Math.round(miss_distance.distance * 100) / 100} {miss_distance.unit}</div>
                                        </div>
                                    </div>
                                </div>
                                <button className="learn-more is-size-6">Learn More</button>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
                <AnimatePresence>
                    {selectedId === data.id && (
                        <motion.div className="asteroid-modal-container" onClick={() => closeModal()}>
                            <motion.div
                            layoutId={data.id}
                            className="asteroid-modal"
                            >
                                <div className="level asteroid-title is-mobile px-5 py-1 m-0">
                                    <div className="level-left"><h2 className="asteroid-name my-5 is-size-4">{data.name}</h2></div>
                                    <div className="level-right"><FontAwesomeIcon icon={faTimes} onClick={() => closeModal()} /></div>
                                </div>
                                <div className="columns is-gapless">
                                    <div className="column is-two-fifths asteroid-modal-img">
                                        <motion.img src={AsteroidImg} alt={data.name} width={asteroidImgSize} animate={{rotate: 360 }} transition={{ repeat: Infinity, ease: 'linear', duration: 3 }} />
                                    </div>
                                    <div className="column is-three-fifths asteroid-modal-details mt-5">
                                            <div className="level is-mobile mb-2 px-5 py-2">
                                                <div className="level-left"><strong>Diameter</strong>:</div>
                                                <div className="level-right">
                                                    {Math.round(diameter.min * 100) / 100} - 
                                                    {Math.round(diameter.max * 100) / 100} {diameter.unit}
                                                </div>
                                            </div>
                                            <div className="level is-mobile  mb-2 px-5 py-2">
                                                <div className="level-left"><strong>Hazard Lvl</strong>:</div>
                                                <div className="level-right">
                                                    {data.is_potentially_hazardous_asteroid ? 
                                                    'Hazardous' : 
                                                    'Not hazardous'}
                                                </div>
                                            </div>
                                            <div className="level is-mobile  mb-2 px-5 py-2">
                                                <div className="level-left"><strong>Velocity</strong>:</div>
                                                <div className="level-right">{Math.round(velocity.speed)} {velocity.unit}</div>
                                            </div>
                                            <div className="level is-mobile  mb-2 px-5 py-2">
                                                <div className="level-left"><strong>Miss Distance</strong>:</div>
                                                <div className="level-right">{Math.round(miss_distance.distance * 100) / 100} {miss_distance.unit}</div>
                                            </div>
                                            <div className="level is-mobile  mb-2 px-5 py-2">
                                                <div className="level-left"><strong>Orbiting Body</strong>:</div>
                                                <div className="level-right">{data.close_approach_data[0].orbiting_body}</div>
                                            </div>
                                            <div className="level is-mobile  mb-2 px-5 py-2">
                                                <div className="level-left"><strong> Magnitude</strong>:</div>
                                                <div className="level-right">{data.absolute_magnitude_h}</div>
                                            </div>
                                            <div className="level is-mobile  mb-2 px-5 py-2">
                                                <div className="level-right"><a href={data.nasa_jpl_url} target="_blank" rel="noopener noreferrer">{data.name} NASA Profile</a></div>
                                            </div>
                                        <br />
                                    </div>
                                </div>    
                            </motion.div>
                        </motion.div>
                    )} 
                </AnimatePresence>
            </AnimateSharedLayout>
        </>
    )
}

export default Asteroid;