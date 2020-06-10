import React, { useEffect, Fragment, useState } from "react";
import { Segment, Icon, Button, Modal, Form } from "semantic-ui-react";
import { getTeacherByLesson ,assignUserToLesson } from "../../Redux/Actions/lessonAction";
import { connect } from "react-redux";
import { getTeachers } from "../../Redux/Actions/userAction";
import LessonTeacherRow from "./LessonTeacherRow";

const LessonTeacher = ({ lessonId, lessonTeacher, getTeacherByLesson,teachers,getTeachers, assignUserToLesson }) => {
  const [open, setOpen] = useState(false);
  const [teacherId,setTeacherId] = useState()

  const handleAssign = (teacherId) => {
    assignUserToLesson(lessonId,teacherId)
  }

  useEffect(() => {
    getTeacherByLesson(lessonId);
  }, [getTeacherByLesson, lessonId]);

  return (
    <Segment>
      <h3>
        <Icon name="user" />
        Derse Atanmış Öğretmen
      </h3>
      {lessonTeacher.name ? (
        <LessonTeacherRow lessonId={lessonId} lessonTeacher={lessonTeacher} />
      ) : (
        <Fragment>
          <h4>Derse Atanmış Bir Hoca Bulunmamaktadır.</h4>
          <Button
            style={{ display: "inline-block" }}
            content="Derse Öğretmen Ata"
            onClick={() => {
                getTeachers()
                setOpen(!open)}}
            color="linkedin"
          />
        </Fragment>
      )}

      <Modal
        size="tiny"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Modal.Header>Derse Öğretmen Atama</Modal.Header>
        <Modal.Content>
          <p>Lütfen Öğretmen Seçiniz..</p>
          <Form.Input control='select'  onChange={(e) => setTeacherId(e.target.value)}>
            <option >Lütfen Bir Öğretmen seçiniz.</option>
              {teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>{teacher.name+" "+teacher.surname}</option>
              ))}
          </Form.Input>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            
          >
            Vazgeç
          </Button>
          <Button
            onClick={() => handleAssign(teacherId)}
            positive
            icon="checkmark"
            labelPosition="right"
            content="Ata"
          />
        </Modal.Actions>
      </Modal>
    </Segment>
  );
};

const mapStateToProps = (state) => ({
  lessonTeacher: state.lessonReducer.lessonTeacher,
  teachers: state.userReducer.teachers,
});

const mapDispatchToProps = {
  getTeacherByLesson,
  getTeachers,
  assignUserToLesson
};

export default connect(mapStateToProps, mapDispatchToProps)(LessonTeacher);
