/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

export default function FullInfo({profData}) {
    
    
    const {biography, memberSince, title, institute, city, state} = profData;
    const biographyGeneric =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime minima nisi illum ipsam eveniet eaque suscipit neque officia molestias a amet incidunt consequatur nobis cupiditate, non corporis fugiat in placeat?"

    return (
        <div>
            <div className='padd-md-b font-main text-bold text-center- font-xl border-bottom-color-main'>
                Información completa de {profData.name}
            </div>

            <div >
                <div className='full-info-span'>
                    <span >¿Por qué elegirme?</span>
                </div>
                <div className='full-info-container'>
                    <div className='full-info-up'>
                        {biography
                        ? biography
                        : biographyGeneric
                        }
                    </div>
                    
                    <div className='full-info-down'>
                        <div className='little-box'>
                            <span>Titulo profesional</span>
                            <h3 className='capitalize'>{
                                title
                                ? title
                                : "N/A"
                                }
                            </h3>
                        </div>
                        <div className='little-box'>
                            <span>Institución</span>
                            <h3 className='capitalize'>{
                                institute
                                ? institute
                                : "N/A"
                                }
                            </h3>
                        </div>
                        <div className='little-box'>
                            <span>Ubicación</span>
                            <h3 className='capitalize'>{`${city} (${state})`}</h3>
                        </div>
                        <div className='little-box'>
                            <span>Miembro desde</span>
                            <h3>{memberSince
                                ? memberSince.slice(0,10)
                                : "01/01/2000"
                            }</h3>
                        </div>
                    </div>
                </div>
                
            
            </div>

        </div>
    )
};