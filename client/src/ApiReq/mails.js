import axios from "axios";
import {BASIC_URL} from '../constants'

export function sendMail(type,body) {
  return axios.post(`${BASIC_URL}/emails?type=${type}`,body).data;
}
