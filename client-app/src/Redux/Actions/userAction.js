import * as actionTypes from "./actionTypes";
import Axios from "axios";
import { history } from "../../Helpers/history";

let token = null;
let req_config = null;

const getToken = () => {
  token = localStorage.getItem("token");
  req_config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getTeachers = () => (dispatch) => {
  getToken();
  Axios.get(
    "https://localhost:44386/api/User/GetUsersByRoleName/teacher",
    req_config
  )
    .then((result) => dispatch(getTeachersSuccess(result.data)))
    .catch((error) => {
      throw error;
    });
};

const getTeachersSuccess = (teachers) => ({
  type: actionTypes.GET_TEACHERS_SUCCESS,
  payload: teachers,
});

export const getStudents = () => (dispatch) => {
  getToken()
  Axios.get("https://localhost:44386/api/User/GetUsersByRoleName/student", req_config)
  .then(result => dispatch(getStudentsSuccess(result.data)))
  .catch(error => {
    throw error
  })
}

const getStudentsSuccess = (students) => ({
  type : actionTypes.GET_STUDENTS_SUCCESS,
  payload : students
})

export const getUserById = (user_Id) => (dispatch) => {
  getToken();
  Axios.get(
    `https://localhost:44386/api/User/GetUserById/${user_Id}`,
    req_config
  )
    .then((result) => dispatch(getUserByIdSuccess(result.data)))
    .catch((error) => {
      throw error;
    });
};

const getUserByIdSuccess = (user) => ({
  type: actionTypes.GET_USER_BY_ID_SUCCESS,
  payload: user,
});

export const createUser = (user,role) => (dispatch) => {
  getToken();
  Axios.post("https://localhost:44386/api/User/AddUser", user, req_config)
    .then((result) => {
      if (role === "Teacher" && result.data.succeeded) {
        history.push("/TeacherList");
      } else {
        history.push("/StudentList");
      }
    })
    .catch((error) => {
      throw error;
    });
};

const createTeacherSuccess = (user) => ({
  type: actionTypes.TEACHER_CREATE_SUCCESS,
  payload: user,
});

const createStudentSuccess = (user) => ({
  type: actionTypes.STUDENT_CREATE_SUCCESS,
  payload: user,
});

export const deleteUserById = (user_Id, role) => (dispatch) => {
  getToken();
  Axios.delete(
    `https://localhost:44386/api/User/DeleteUser/${user_Id}`,
    req_config
  )
    .then((result) => {
      if (role === "Teacher") {
        dispatch(deleteTeacherSuccess(user_Id));
        history.push("/TeacherList");
      } else {
        dispatch(deleteStudentSuccess);
        history.push("/StudentList");
      }
    })
    .catch((error) => {
      throw error;
    });
};

const deleteTeacherSuccess = (user_Id) => ({
    type : actionTypes.TEACHER_DELETE_SUCCESS,
    payload : parseInt(user_Id)
})

export const deleteStudentSuccess = (user_Id) => ({
  type : actionTypes.DELETE_STUDENT_SUCCESS,
  payload : parseInt(user_Id)
})



export const updateUser = (user) => (dispatch) => {
  getToken();
  Axios.put(`https://localhost:44386/api/User/UpdateUser/`, user, req_config)
    .then((result) => {
      history.push(`/${user.userRole}List`);
    })
    .catch((error) => {
      throw error;
    });
};
