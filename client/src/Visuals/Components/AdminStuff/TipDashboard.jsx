import React, {useEffect, useState} from "react";
import * as FaIcons from 'react-icons/fa';
import {useDispatch, useSelector} from "react-redux";
import {deleteAdminTip,putAdminTip,getAdminTips} from "../../../Controllers/actions/adminActions";
import Swal from 'sweetalert2';
import TipsForm from "./TipsForm";

function TipDashboard({token}){
  const dispatch = useDispatch();
  const allTips = useSelector(state=>state.adminReducer.adminTips);
  const allCategories = useSelector(state => state.constantInfoReducer.categories);
  const tipDeleted = useSelector(state=>state.adminReducer.tipDeleted);
  const tipModified = useSelector(state=>state.adminReducer.tipModified);
  const tipPosted = useSelector(state=>state.adminReducer.tipPosted);
  const [tipCateg,setTipCateg] = useState('Todas'); //allCategories[0]._id

  function handleChange(ev){
    ev.preventDefault();
    setTipCateg(ev.target.value);
  }

  function handleTipDelete(id){
    return Swal.fire({
          text:`Desea borrar este tip? Esta acción no se puede deshacer.`,
          icon: 'question',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Si',
          confirmButtonColor: "rgba(232,52,84,0.84)",
          cancelButtonColor: "#8c8f9a",
        }).then(result=>{
          if(result.isConfirmed){
            dispatch(deleteAdminTip(id, token));
            Swal.fire({
              text:`Tip eliminado.`,
              icon:'error',
              confirmButtonColor: "rgba(232,52,84,0.84)"})}})
  }

  function handleTipChange(status,id){
    return Swal.fire({
          text:`Desea ${!status?'aprobar':'desaprobar'} este tip? Si ${status?'no':''} está aprobado ${status?'no':''} se mostrará en la página.`,
          icon: 'question',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: `${!status?'Aprobar':'Desaprobar'}`,
          confirmButtonColor: `${!status?'rgb(165 220 134)':'rgba(232,52,84,0.84)'}`,
          cancelButtonColor: "#8c8f9a",
        }).then(result=>{
          if(result.isConfirmed){
            dispatch(putAdminTip({isApproved:!status}, id, token));
            Swal.fire({
              text:`Estado cambiado.`,
              icon:'success',
              confirmButtonColor: "rgb(165 220 134)"})}})
  }
  useEffect(()=>{
    dispatch(getAdminTips(token));
  },[tipPosted, tipDeleted, tipModified, dispatch, token]);

  useEffect(()=>{
    if(!allTips.length) dispatch(getAdminTips(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div className="flex items-start mrg-2x-b">
      <div className="flex flex-col ">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-3">
          <div className="py-2 align-middle inline-block min-w-min sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Texto
                  </th>
                  {tipCateg==="Todas"?
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                    </th>
                    :<th/>}
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium whitespace-nowrap text-gray-500 uppercase tracking-wider">
                    Cambiar estado
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Borrar
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {allTips && allTips.filter(t => {
                  if (tipCateg==='Todas') return true;
                  else return t.categoryId?t.categoryId._id === tipCateg:false;})
                  .map(t=> {
                    return (<tr key={t._id}>
                    <td className="px-6 py-2 whitespace-wrap">
                      <div className="text-sm font-normal text-gray-900">
                        {t.text}
                      </div>
                    </td>
                      {tipCateg==="Todas"?<td className="px-6 py-4 whitespace-nowrap text-left">
                        {t.categoryId?
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-400 text-gray-800">
                    {t.categoryId.name} </span> :
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-400 text-gray-800">
                    No TIENE</span>}
                      </td>
                        :<td/>}
                    <td className="px-6 py-4 whitespace-nowrap text-left">
                      {t.isApproved?
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-gray-800">
                    Aprobado </span> :
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-gray-800">
                    No aprobado</span>}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <button onClick={()=>handleTipChange(t.isApproved,t._id)}><FaIcons.FaRedo/></button>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <button onClick={()=>handleTipDelete(t._id)}><FaIcons.FaRegTrashAlt/></button>
                    </td>
                  </tr>)
                })}
                </tbody>
              </table>
            </div></div></div></div>
      <div>
      <TipsForm />
      <select className="bg-gray-200 border-2 rounded-md width-80" name="categoryId" value={tipCateg} onChange={handleChange}>
        <option readOnly>Todas</option>
        {allCategories&&allCategories.map(c=><option key={c._id} value={c._id} >{c.name}</option>)}
      </select>
      </div>
    </div>
  )
}

export default TipDashboard;