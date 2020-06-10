import {combineReducers} from "redux";
import authReducer from './authReducer';
import userReducer from './userReducer'
import lessonReducer from './lessonReducer'
import homeworkReducer from './homeworkReducer'


const reducers = combineReducers({
    authReducer,
    userReducer,
    lessonReducer,
    homeworkReducer
})

export default reducers;
