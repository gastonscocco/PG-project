/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../Components/Loading'
import QuickInfo from './QuickInfo'
import Schedules from './Schedules'
import Opinions from './Opinions'
import FullInfo from './FullInfo'


// import ProfessionalCardComponent from './ProfessionalCardComponent'
// import ProfessionalCardData from './ProfessionalCardData'
// import ProfessionalOpinionsComponents from './ProfessionalOpinionsComponents'

export default function ProfessionalContainer({username, login}) {
    
    const profData= useSelector(state=> state.professionalReducer.profDetail)

    const session = useSelector(state => state.sessionReducer.status.token)
    const divClass = 'flex justify-center items-center h-screen w-screen'
    const imgClass= 'w-96 h-96'

    if(username===profData.username) {


const test = [{
                score: 4,
                text: "Excelente atención, es un gran arquitecto. Cuenta buenos chistes.",
                customerId: {name:'Armando', lastname:'cabezas'},
                _id: "6195ed21e75cdff47a806b7b"
            },
            {
                score: 4,
                text: "Excelente atención, es un gran arquitecto. Cuenta buenos chistes.",
                customerId: {name:'Armando', lastname:'cabezas'},
                _id: "6195ed21e75cdff47a806b7b"
            }
        ]




    return (
        <React.Fragment>
        <div className="wrapper bg-professional-title">
            <div className="wrapper padd-lg bg-color-light-a80">
                <section>
                    <div className="col-1-1@xl col-1-1@lg col-1-1@md">
                        <div className='font-main font-2x'>
                            {profData.isProfessional?
                            <div>
                                <span className="padd-md-b padd-lg-r text-bold border-bottom-color-main">
                                    {`${profData.name} ${profData.lastname}`}
                                </span>
                                <div className="mrg-sm-t">
                                    {profData.category.name}
                                </div>
                            </div>
                            :<span>{`${profData.name} ${profData.lastname}`}</span>}
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <div className='wrapper mrg-lg-t'>
            <section>
                <div className='col-1-1@xl col-1-1@lg col-1-1@md col-1-1@sm col-1-1@xs' data-uk-height-match=".normalize">
                    <div className='col-1-5@xl col-1-4@lg col-1-1@md col-1-1@sm col-1-1@xs padd-lg bg-t3-'>
                        <div className='padd-lg bg-color-light border-color-dark-a20 border-radius-sm box-shadow-xs normalize'>
                                
                            {
                                profData.isProfessional &&
                                <QuickInfo data={profData} />
                            }
                                
                        </div>
                    </div>


                    <div className='col-2-5@xl col-3-4@lg col-1-1@md col-1-1@sm col-1-1@xs padd-lg'>
                        <div className='padd-lg bg-color-light border-color-dark-a20 border-radius-sm box-shadow-xs normalize'>
                            
                            {
                                profData.isProfessional &&
                                <FullInfo profData={profData} />
                            }
                        </div>
                    </div>


                    <div className='col-1-5@xl col-2-4@lg col-1-1@md col-1-1@sm col-1-1@xs padd-lg bg-t5-'>
                        <div className='bg-color-light border-color-dark-a20 border-radius-sm box-shadow-xs normalize'>
                            
                            {
                                profData.isProfessional &&
                            <Schedules
                                    id={profData._id}
                                    login={session}
                                    name={profData.name}
                                    lastname={profData.lastname}
                                    category={profData.category.name}
                                    cost={profData.cost}
                                />
                            }
                            
                        </div>
                    </div>


                    <div className='col-1-5@xl col-2-4@lg col-1-1@md col-1-1@sm col-1-1@xs padd-lg bg-t6-'>
                        <div className='bg-color-light border-color-dark-a20 border-radius-sm box-shadow-xs normalize'>
                            {
                                profData.isProfessional &&
                                <Opinions opinions={test}/>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </React.Fragment>
    )}
    else{
        return <Loading divClass={divClass} imgClass={imgClass}/>
    }
};