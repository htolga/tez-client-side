import * as actionTypes from './actionTypes';
import Axios from 'axios';
import {history} from '../../Helpers/history'

export const userLogin = (user) => (dispatch) =>{
    dispatch({type : actionTypes.USER_LOGIN, payload : true })
    setTimeout(() => {
        Axios.post("https://localhost:44386/api/User/Authentication/", user)
    .then(result => {
        localStorage.setItem("token", result.data.token)
        dispatch(userLoginSuccess(result.data))
        history.push("/Homepage")
    })
    .catch(error => {
        dispatch({type : actionTypes.USER_LOGIN_FAILED, payload : false})
    })
    }, 1000);
    
}

const userLoginSuccess = (user) => ({
    type : actionTypes.USER_LOGIN_SUCCESS,
    payload : {
        user,
        failed : false,
        isLogged : true,
        loadder : false
    }
})

export const userLogout = () => (dispatch) => {
    localStorage.removeItem("token");
    dispatch(userLogoutSuccess());
    history.push("/")
  };

const userLogoutSuccess = () => ({ type: actionTypes.USER_LOGOUT_SUCCESS});
  


