import * as actionTypes from '../Actions/actionTypes'

const initialState = {
    lessons : [],
    lesson : {},
    homeworks: [],
    lessonStudents : [],
    lessonTeacher : {},
    userLessons : [],
    lessonsWOTeacher : [],
    notOwnedLessons : [],
    lessonDocuments : []
}


const lessonReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.GET_ALL_LESSONS_SUCCESS:
            return {...state, lessons : action.payload}
        case actionTypes.GET_LESSON_BY_ID:
            return {...state, lesson : action.payload}    
        case actionTypes.GET_STUDENT_BY_LESSON:
            return {...state, lessonStudents : action.payload}
        case actionTypes.GET_TEACHER_BY_LESSON:
            return {...state, lessonTeacher : action.payload}    
        case actionTypes.GET_LESSON_BY_USER_ID:
            return {...state, userLessons : action.payload}
        case actionTypes.GET_LESSON_WITHOUT_TEACHER:
            return {...state, lessonsWOTeacher : action.payload}     
        case actionTypes.GET_NOT_OWNED_LESSONS_BY_USER_ID:
            return {...state, notOwnedLessons : action.payload}       
        case actionTypes.GET_LESSON_DOCUMENTS:
            return {...state, lessonDocuments : action.payload}    
        default : 
        return {...state}
    }
}

export default lessonReducer