import * as actionTypes from '../Actions/actionTypes'


const initialState = {
    lessonHomework : [],
    homework : {},
    homeworkDocuments : [],
    studentHomeworks : [],
    deadline : false,
    checkHomework : false
}

const homeworkReducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.GET_HOMEWORKS_BY_LESSON_ID:
            return {...state, lessonHomework : action.payload}
        case actionTypes.GET_HOMEWORKS_BY_ID:
            return {...state, homework : action.payload }
        case actionTypes.UPDATE_HOMEWORK_BY_ID:
            let updatedHomework =  action.payload
            let newArray = state.lessonHomework.filter(item => item.id != updatedHomework.id).concat(updatedHomework)
            return {...state, lessonHomework : newArray}
        case actionTypes.GET_HOMEWORK_DEADLINE_BOOLEAN:
            let date = state.homework.deadline.substring(0, 10); 
            const now =  Date.now();
            const tempDeadline =  now > Date.parse(date)
            return {...state, deadline : tempDeadline}
        case actionTypes.GET_HOMEWORK_DOCUMENTS:
            return {...state, homeworkDocuments : action.payload}    
        case actionTypes.GET_ALL_STUDENT_HOMEWORK_BT_HOMEWORK_ID:
            return {...state, studentHomeworks : action.payload}    
        case actionTypes.CHECK_STUDENT_HOMEWORK:
            return {...state, checkHomework : action.payload}    
        default : 
            return {...state}    
    }

}

export default homeworkReducer