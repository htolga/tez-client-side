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

export const addHomeworkToLesson = (homework) => (dispatch) => {
  getToken();
  Axios.post("https://localhost:44386/api/Homework/AddHomeworkToLesson", homework, req_config)
    .then((result) => history.goBack())
    .catch((error) => {
      throw error;
    });
};

export const getHomeworkByLessonId = (lessonId) => (dispatch) => {
  getToken();
  Axios.get(
    `https://localhost:44386/api/Homework/GetHomeworkByLessonId/${lessonId}`,
    req_config
  )
    .then((result) => dispatch(getHomeworkByLessonIdSuccess(result.data)))
    .catch((error) => {
      throw error;
    });
};

const getHomeworkByLessonIdSuccess = (homeworks) => ({
  type: actionTypes.GET_HOMEWORKS_BY_LESSON_ID,
  payload: homeworks,
});

export const getHomeworkById = (homeworkId) => (dispatch) => {
    getToken()
    Axios.get(`https://localhost:44386/api/Homework/GetHomeworkById/${homeworkId}`, req_config)
    .then(result => dispatch(getHomeworkByIdSuccess(result.data)))
    .catch(error => {
        throw error
    })
}

const getHomeworkByIdSuccess = (homework) => ({
    type : actionTypes.GET_HOMEWORKS_BY_ID,
    payload : homework
})


export const updateHomeworkById = (homeworkId,homework) => (dispatch) => {
  getToken()
  Axios.put(`https://localhost:44386/api/Homework/UpdateHomeworkById/${homeworkId}`, homework, req_config)
  .then(result => {
    dispatch(updateHomeworkByIdSuccess(result.data))
    history.goBack()
  })
  .catch(error => {
    throw error
  })
}

const updateHomeworkByIdSuccess = (homework) => ({
  type : actionTypes.UPDATE_HOMEWORK_BY_ID,
  payload : homework
})

export const deleteHomeworkById = (homeworkId) => (dispatch) => {
  getToken()
  Axios.delete(`https://localhost:44386/api/Homework/DeleteHomeworkById/${homeworkId}`, req_config)
  .then(() => history.goBack())
  .catch(error => {
    throw error
  })
}

export const getHomeworkDeadlineBoolean = () => (dispatch) => {
  dispatch({ type : actionTypes.GET_HOMEWORK_DEADLINE_BOOLEAN})
}

export const uploadDocumentToHomework = (formData,homeworkId) => (dispatch) => {
  getToken()
  Axios({
    url: `https://localhost:44386/api/Homework/AddDocumentToHomework/${homeworkId}`,
    method: 'POST',
    headers : {
      Authorization: `Bearer ${token}`
    },
    data : formData  
  }).then(res => history.goBack())
  .catch(error => {
    throw error
  })
}


export const getHomeworkDocuments = (homeworkId) => (dispatch) => {
  getToken()
  Axios.get(`https://localhost:44386/api/Homework/GetHomeworkDocumentByHomeworkId/${homeworkId}`, req_config)
  .then(result => dispatch(getHomeworkDocumentsSuccess(result.data)))
  .catch(error => {
    throw error
  })
}

const getHomeworkDocumentsSuccess = (documents) => ({
  type : actionTypes.GET_HOMEWORK_DOCUMENTS,
  payload : documents
})

export const downloadHomeworkDocuments = (name,key) => (dispatch) => {
  getToken()
  Axios({
    url: 'https://localhost:44386/api/Homework/DownloadHomeworkDocumentById/' + key,
    method: 'GET',
    headers : {
      Authorization: `Bearer ${token}`
    },
    responseType: 'blob', // important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
  });
}

export const deleteHomeworkDocument = (documentId) => (dispatch) => {
  getToken()
  Axios.delete(`https://localhost:44386/api/Homework/DeleteHomeworkDocument/${documentId}`, req_config)
  .then(result => {history.goBack()})
  .catch(error => {
    throw error
  })
}

export const uploadStudentHomework = (file,homeworkId,studentId) => (dispatch) => {
  getToken()
  Axios({
    url: `https://localhost:44386/api/Homework/AddHomeworkToHomework/${homeworkId}/${studentId}`,
    method: 'POST',
    headers : {
      Authorization: `Bearer ${token}`
    },
    data : file  
  }).then(res => history.goBack())
  .catch(error => {
    throw error
  })
}


export const getAllStudentHomeworkByHomeworkId = (homeworkId) => (dispatch) => {
  getToken()
  Axios.get(`https://localhost:44386/api/Homework/GetAllStudentHomeworkByHomeworkId/${homeworkId}`, req_config)
  .then(result => dispatch(getAllStudentHomeworkByHomeworkIdSuccess(result.data)))
  .catch(error => {
    throw error
  })
}

const getAllStudentHomeworkByHomeworkIdSuccess = (studentHomeworks) => ({
  type : actionTypes.GET_ALL_STUDENT_HOMEWORK_BT_HOMEWORK_ID,
  payload : studentHomeworks
})

export const downloadStudentHomework = (name,key) => (dispatch) => {
  getToken()
  Axios({
    url: 'https://localhost:44386/api/Homework/DowloadHomeworkByStudentHomeworkId/' + key,
    method: 'GET',
    headers : {
      Authorization: `Bearer ${token}`
    },
    responseType: 'blob', // important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
  });
}

export const checkStudentHomework = (homeworkId,studentId) => (dispatch) => {
  getToken()
  Axios.get(`https://localhost:44386/api/Homework/CheckStudentHomework/${homeworkId}/${studentId}`, req_config)
  .then(result => {
    if(result.data){
      
      dispatch(checkStudentHomeworkSuccess(result.data))
    }else{
      dispatch(checkStudentHomeworkFailed(result.data))
    }
  })
  .catch(error => {
    throw error
  })
}

const checkStudentHomeworkSuccess = (result) => ({
  type : actionTypes.CHECK_STUDENT_HOMEWORK,
  payload : result
})

const checkStudentHomeworkFailed = (result) => ({
  type : actionTypes.CHECK_STUDENT_HOMEWORK,
  payload : result
})