import React from 'react'

const ReportProblem = () => {
    return (  
        <div className='m-24'>
            <div className="flex flex-col">
            <label className="leading-loose text-2xl text-center"> Describe tu problema aquí y te contactaremos en breve</label>
            <textarea
                className="form-textarea mt-1 block w-full border-2"
                rows="8"
                placeholder="Describe tu problema aquí."
                ></textarea>  
            </div>
               
            <div className="pt-4 flex items-center space-x-4">
                    <button className="bg-red-400  hover:bg-red-500 transition duration-300 ease-in-out flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Crear Reporte</button>
            </div>
        </div>
    );
}
 
export default ReportProblem;