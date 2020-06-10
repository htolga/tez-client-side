import React, { useEffect } from "react";
import { Segment, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { getLessonById } from "../../Redux/Actions/lessonAction";
import LessonInfo from "./LessonInfo";
import LessonTeacher from "./LessonTeacher";
import LessonStudents from "./LessonStudents";
import LessonDocuments from "./LessonDocuments";
import LessonHomework from "./LessonHomework";
import { useHistory } from "react-router-dom";

const LessonDetails = ({ user, lesson, match, getLessonById }) => {

  const history = useHistory()
  
  useEffect(() => {
    getLessonById(match.params.lessonId);
  }, [match, getLessonById]);

  if (user.role === "Admin") {
    return (
      <Segment textAlign="left">
        <h1>{lesson.name}</h1>
        <LessonInfo lesson={lesson} />
        <LessonTeacher lessonId={lesson.id} />
        <LessonStudents lessonId={lesson.id} />
        <LessonDocuments role={user.role} lessonId={lesson.id} />
        <LessonHomework role={user.role} lessonId={lesson.id} />
        <Button content="Geri Dön" onClick={() => history.goBack()}  />
      </Segment>
    );
  } else {
    return (
      <Segment textAlign="left">
        <h1>{lesson.name}</h1>
        <LessonDocuments role={user.role} lessonId={lesson.id} />
        <LessonHomework role={user.role} lessonId={lesson.id} />
      </Segment>
    );
  }
};

const mapStateToProps = (state) => ({
  lesson: state.lessonReducer.lesson,
  user: state.authReducer.user,
});

const mapDispatchToProps = {
  getLessonById,
};

export default connect(mapStateToProps, mapDispatchToProps)(LessonDetails);
