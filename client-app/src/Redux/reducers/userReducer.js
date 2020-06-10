import * as actionTypes from '../Actions/actionTypes'

const initialState = {
    teachers : [],
    user :  {},
    students : []
}

const userReducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.GET_TEACHERS_SUCCESS:
            return {
                ...state,
                teachers : action.payload
            }
        case actionTypes.GET_STUDENTS_SUCCESS:
            return {...state, students : action.payload}    
        case actionTypes.GET_USER_BY_ID_SUCCESS:
            return {
                ...state,
                user : action.payload
            }
        case actionTypes.TEACHER_CREATE_SUCCESS:
            let temp = state.teachers.concat(action.payload)
            return {
                ...state,
                teachers : temp
            }
        case actionTypes.STUDENT_CREATE_SUCCESS:
            let stuTemp = state.students.concat(action.payload)
            return {...state, students : stuTemp}    
        case actionTypes.TEACHER_DELETE_SUCCESS:
            const tempArr = state.teachers.filter(item => item.id !== action.payload)
            return {
                ...state,
                teachers : tempArr
            }    
        case actionTypes.DELETE_STUDENT_SUCCESS:
            const temper = state.students.filter(item => item.id !== action.payload)
            return {...state, students : temper}            
        default : 
            return {...state}
    }
}

export default userReducer