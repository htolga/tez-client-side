import * as actionTypes from '../Actions/actionTypes'

const initialState = {
    user : {},
    isLogged : false,
    failed  : false,
    loader : false
}

const authReducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.USER_LOGIN:
            return {...state, loader : action.payload}
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                user : action.payload.user,
                failed : action.payload.failed,
                isLogged : action.payload.isLogged,
                loader : action.payload.loader
            }
        case actionTypes.USER_LOGIN_FAILED:
            return{
                ...state,
                failed : true,
                loader : action.payload
            } 
        case actionTypes.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                isLogged : false,
                user : {}
            }       
        default :
            return {...state}
    }
}

export default authReducer