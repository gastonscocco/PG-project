import axios from 'axios';
import {BASIC_URL} from '../constants'

const url = `${BASIC_URL}/admin`;

export function getAllUsers(){
    return axios.get(`${url}/users`)
    .then(r => r.data)
    .catch(err=>err.response.data)
};

export function deleteUser(username){
    return axios.delete(`${url}/users/${username}`)
    .then(r=>r.data)
    .catch(r=>r.response.data)
}

export function putUser(username,info){
    return axios.put(`${url}/users/${username}`, info)
    .then(r=>r.data)
    .catch(r=>r.response.data)
}

export function deleteAppointment(appointmentID){
    return axios.delete(`${url}/appointment/${appointmentID}`)
    .then(r=>r.data)
    .catch(r=>r.response.data)
}

export function putAppointment(appointmentID,info){
    return axios.put(`${url}/appointment/${appointmentID}`, info)
    .then(r=>r.data)
    .catch(r=>r.response.data)
}

export function postCategory(category){
    return axios.post(`${url}/category`, category)
    .then(r=>r.data)
    .catch(r=>r.response.data)
}

export function putCategory(categoryID, info){
    return axios.put(`${url}/category/${categoryID}`, info)
    .then(r=>r.data)
    .catch(r=>r.response.data)
}

export function deleteCategory(categoryID){
    return axios.delete(`${url}/category/${categoryID}`)
    .then(r=>r.data)
    .catch(r=>r.response.data)
}
export function postCountry(info){
    return axios.post(`${BASIC_URL}/countries`,info)
      .then(r=>r.data)
      .catch(r=>r.response.data)
}
export function deleteCountry(_id){
    return axios.delete(`${BASIC_URL}/countries/${_id}`)
      .then(r=>r.data)
      .catch(r=>r.response.data)
}
export function getAllTips(){
    return axios.get(`${url}/tips`)
      .then(r => r.data)
      .catch(err=>err.response.data)
}
export function putTip(info,_id){
    return axios.put(`${url}/tips/${_id}`,info)
      .then(r => r.data)
      .catch(err=>err.response.data)
}
export function deleteTip(_id){
    return axios.delete(`${url}/tips/${_id}`)
      .then(r => r.data)
      .catch(err=>err.response.data)
}
export function postTip(info){
    return axios.post(`${url}/tips`,info)
      .then(r => r.data)
      .catch(err=>err.response.data)
}
export function getAllReviews(){
    return axios.get(`${url}/reviews`)
      .then(r => r.data)
      .catch(err=>err.response.data)
}
export function deleteReview(_id){
    return axios.delete(`${url}/reviews/${_id}`)
      .then(r => r.data)
      .catch(err=>err.response.data)
}
export function putReview(info,_id){
    return axios.put(`${url}/reviews/${_id}`,info)
      .then(r => r.data)
      .catch(err=>err.response.data)
}