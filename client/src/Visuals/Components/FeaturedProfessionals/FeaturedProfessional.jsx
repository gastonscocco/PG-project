import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {Link} from 'react-router-dom'

const FeaturedProfessional = ({data}) => {
    const {img, likes,dislikes,fullname,username} = data
    const category = data.category[0].name
    return (
        <div className="col-1-5@xl col-1-5@lg col-1-5@md col-1-5@sm padd-lg">
            <div className="">
                <img src={img}/>
            </div>
            <div className="padd-xl-t padd-lg-lr padd-lg-b border-top-color-main border-4x position-relative bg-color-light">
                <div className="position-middle-parent">
                    <div className="icon-xl border-radius-sm bg-color-main flex-center"><span>Icon</span></div>
                </div> 
                <div className="text-bold text-center font-lg font-main">{fullname}</div>
                <div className="text-bold text-center">{category}</div>
                <div className="mrg-lg-t flex-center">
                    <div className="padd-lg-r">
                        <FaIcons.FaThumbsUp/> {likes}
                    </div>
                    <div className="padd-lg-l">
                        <FaIcons.FaThumbsDown/> {dislikes}
                    </div>
                </div>
                <Link to={`/profesionales/${username}`}>
                    <div className="mrg-lg-t padd-md border-radius-sm action action-professional">
                        Ver Profesional
                    </div>
                </Link>
            </div>
        </div>
    );
}
export default FeaturedProfessional;