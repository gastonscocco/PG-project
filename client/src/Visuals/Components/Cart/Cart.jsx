import React, {useEffect} from "react";
import ReactDOM from "react-dom"
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import CartElement from "./CartElement";
import { removeFromCartAll } from "../../../Controllers/actions/cartActions";
import { setAvailability } from "../../../ApiReq/schedule";
import Swal from 'sweetalert2'
import { postCartInfo } from "../../../ApiReq/cart";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function Cart(){

const userOnPage = useSelector(state=>state.sessionReducer.status);
const {token} = userOnPage; 
const {id} = userOnPage;
const order = useSelector(state=>state.sessionReducer.cart).filter(o=>o.customerId===id);
const objInfo = {};
const dispatch = useDispatch();
let history = useHistory();

// PAYPAL
    const createOrder = (data,actions) => {
        
        return actions.order.create({
           purchase_units: [
              {
                 amount: {
                    value: suma,
                 }
              }
           ]
        })
     }
 
   const onApprove = (data, actions) => {
      objInfo.orderID = data.orderID;
      objInfo.payerID = data.payerID;
    return actions.order.capture(handlePay());
  }
//////////////////// FIN PP

 function  handlePay(){

    // order.forEach(e =>{
    //     setAvailability(e.id)
    // })
    objInfo.customerId = order[0].customerId;
    objInfo.cart = order.map(e => {
        return {
            key: e.id,
            name: e.name,
            price: e.price,
            id: e.id,
            professionalId: e.professionalId,
            meetingLink: e.meetingLink
        }
    })
    postCartInfo(objInfo,token)
    .catch(err => alert(err))

    dispatch(removeFromCartAll())
     Swal.fire({
        title: 'Pago Realizado!',
        text: 'Redireccionado al panel de facturación',
        icon:'success',
        confirmButtonColor: "#e83454", 
    });
    history.push('/facturas')
    
}
  
    
   const elements= order.map((o,i)=><li key={i} className="mb-2" key={o._id}>
        <CartElement 
        name={o.name}
        date={o.appointment.date}
        sessions={o.appointment.sessions}
        price={o.price}
        id={o.id}
        />
    </li>)
    
    let suma= 0
    order.forEach(o=> suma += o.price)

    useEffect(() => {
        window.scrollTo(0, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-4 divide-y ">
        <div className="grid grid-cols-5 gap-4 mb-2 ">
            <p className="text-xl">Consultoria virtual con:</p>
            <p className="text-xl">Fecha</p>
            <p className="text-xl"> Cantidad de sesiones</p>
            <p className="text-xl">Precio</p>
            <p className="text-xl">Eliminar</p>
        </div>
        {elements.length>0 ? <ul className="py-4">
            {elements}
        </ul>: <p className="text-2xl flex justify-center py-6">Tu carrito esta vacio</p>}
        <div className="grid grid-cols-4 gap-4 my-4 py-5">
            <p className="col-span-3 text-2xl">Total</p>
            <p className="text-2xl">$ {suma}</p>
        </div>

        {/* BOTOOON DE PAYPAL FUNCIONANDO*/}
            <div className="wrapper flex-center my-12">
                <div className="width-50">

                <PayPalButton
                className="width-100"
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
             />
                </div>
            </div>
    </div>
    )

}
