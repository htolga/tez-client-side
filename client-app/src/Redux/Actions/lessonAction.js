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

export const getAllLessons = () => (dispatch) => {
  getToken();
  Axios.get("https://localhost:44386/api/Lesson/GetAllLesson", req_config)
    .then((result) => dispatch(getAllLessonsSuccess(result.data)))
    .catch((error) => {
      throw error;
    });
};

const getAllLessonsSuccess = (lessons) => ({
  type: actionTypes.GET_ALL_LESSONS_SUCCESS,
  payload: lessons,
});

export const getLessonById = (lessonId) => (dispatch) => {
  getToken();
  Axios.get(
    `https://localhost:44386/api/Lesson/GetLessonById/${lessonId}`,
    req_config
  )
    .then((result) => dispatch(getLessonByIdSuccess(result.data)))
    .catch((error) => {
      throw error;
    });
};

const getLessonByIdSuccess = (lesson) => ({
  type: actionTypes.GET_LESSON_BY_ID,
  payload: lesson,
});

export const createLesson = (lesson) => (dispatch) => {
  getToken();
  Axios.post("https://localhost:44386/api/Lesson/AddLesson", lesson, req_config)
    .then((result) => history.push("/LessonList"))
    .catch((error) => {
      throw error;
    });
};

export const updateLesson = (lesson, lessonId) => (dispatch) => {
  getToken();
  Axios.put(
    `https://localhost:44386/api/Lesson/UpdateLesson/${lessonId}`,
    lesson,
    req_config
  )
    .then((result) => history.push("/LessonList"))
    .catch((error) => {
      throw error;
    });
};

export const deleteLesson = (lessonId) => (dispatch) => {
  getToken();
  Axios.delete(
    `https://localhost:44386/api/Lesson/DeleteLesson/${lessonId}`,
    req_config
  )
    .then((result) => history.push("/LessonList"))
    .catch((error) => {
      throw error;
    });
};

export const getStudentByLesson = (lessonId) => (dispatch) => {
  getToken();
  Axios.get(
    `https://localhost:44386/api/Lesson/GetStudentByLesson/${lessonId}`,
    req_config
  )
    .then((result) => dispatch(getStudentByLessonSuccess(result.data)))
    .catch((error) => {
      throw error;
    });
};

const getStudentByLessonSuccess = (students) => ({
  type: actionTypes.GET_STUDENT_BY_LESSON,
  payload: students,
});

export const getTeacherByLesson = (lessonId) => (dispatch) => {
  getToken();
  Axios.get(
    `https://localhost:44386/api/Lesson/GetTeacherByLesson/${lessonId}`,
    req_config
  ).then((result) => dispatch(getTeacherByLessonSuccess(result.data)));
};

const getTeacherByLessonSuccess = (teacher) => ({
  type: actionTypes.GET_TEACHER_BY_LESSON,
  payload: teacher,
});

export const assignUserToLesson = (lessonId, userId) => (dispatch) => {
  getToken();
  Axios.post(
    `https://localhost:44386/api/Lesson/AddUserToLesson/${lessonId}/${userId}`,
    req_config
  )
    .then((result) => history.goBack())
    .catch((error) => {
      throw error;
    });
};

export const deleteUserInLesson = (lessonId, userId) => (dispatch) => {
  getToken();
  Axios.delete(
    `https://localhost:44386/api/Lesson/DeleteUserInLesson/${lessonId}/${userId}`,
    req_config
  )
    .then((result) => history.goBack())
    .catch((error) => {
      throw error;
    });
};

export const getLessonByUserId = (userId) => (dispatch) => {
  getToken();
  Axios.get(
    `https://localhost:44386/api/Lesson/GetLessonByUserId/${userId}`,
    req_config
  )
    .then((result) => dispatch(getLessonByUserIdSuccess(result.data)))
    .catch((error) => {
      throw error;
    });
};

const getLessonByUserIdSuccess = (lessons) => ({
  type: actionTypes.GET_LESSON_BY_USER_ID,
  payload: lessons,
});

export const getNotOwnedLessonsByUserId = (userId) => (dispatch) => {
  getToken();
  Axios.get(
    `https://localhost:44386/api/Lesson/GetNotOwnedLessonsByUserId/${userId}`,
    req_config
  )
    .then((result) => dispatch(getNotOwnedLessonsByUserIdSuccess(result.data)))
    .catch((error) => {
      throw error;
    });
};

const getNotOwnedLessonsByUserIdSuccess = (lessons) => ({
  type: actionTypes.GET_NOT_OWNED_LESSONS_BY_USER_ID,
  payload: lessons,
});

export const getLessonWithoutTeacher = () => (dispatch) => {
  getToken();
  Axios.get(
    "https://localhost:44386/api/Lesson/GetLessonwithoutTeacher",
    req_config
  ).then((result) => dispatch(getLessonWithoutTeacherSucess(result.data)));
};

const getLessonWithoutTeacherSucess = (lessons) => ({
  type: actionTypes.GET_LESSON_WITHOUT_TEACHER,
  payload: lessons,
});

export const getLessonDocuments = (lessonId) => (dispatch) => {
  getToken();
  Axios.get(
    `https://localhost:44386/api/File/GetDocumentsByLessonId/${lessonId}`,
    req_config
  )
    .then((result) => dispatch(getLessonDocumentsSuccess(result.data)))
    .catch((error) => {
      throw error;
    });
};

const getLessonDocumentsSuccess = (documents) => ({
  type: actionTypes.GET_LESSON_DOCUMENTS,
  payload: documents,
});

export const uploadDocumentToLesson = (document, lessonId) => (dispatch) => {
  getToken();
  Axios({
    url: `https://localhost:44386/api/File/AddDocument/${lessonId}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: document,
  })
    .then((res) => history.goBack())
    .catch((error) => {
      throw error;
    });
};


export const deleteLessonDocument  = (documentId) => (dispatch) => {
  getToken()
  Axios.delete(`https://localhost:44386/api/File/DeleteDocumentById/${documentId}`, req_config)
  .then(result => history.goBack())
  .catch(error => {
    throw error
  })
}

export const downloadLessonDocuments = (name,key) => (dispatch) => {
  getToken()
  Axios({
    url: 'https://localhost:44386/api/File/DownloadDocumentById/' + key,
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