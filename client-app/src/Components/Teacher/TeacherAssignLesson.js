import React, { Fragment, useState } from "react";
import { Table, Modal, Button, Card, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  getLessonWithoutTeacher,
  assignUserToLesson,
} from "../../Redux/Actions/lessonAction";
import TeacherLessonRow from "./TeacherLessonRow";

const TeacherAssignLesson = ({
  teacherId,
  userLessons,
  lessonsWOTeacher,
  getLessonWithoutTeacher,
  assignUserToLesson,
}) => {
  const [open, setOpen] = useState(false);
  const [lessonId, setLessonId] = useState();

  return (
    <Fragment>
      <Card color="blue" fluid>
        <Card.Content textAlign="left">
          <h3>Üzerine Atanmış Dersler</h3>
          {userLessons.length > 0 ? (
            <Table definition>
              <Table.Body>
                {userLessons.map((lesson) => (
                  <TeacherLessonRow
                    lesson={lesson}
                    key={lesson.id}
                    teacherId={teacherId}
                  />
                ))}
              </Table.Body>
            </Table>
          ) : (
            <p>Öğretmene Atanmış bir ders bulunmamaktadır</p>
          )}
          <Button
            content="Öğretmene Ders Ata"
            color="orange"
            floated="left"
            onClick={() => {
              getLessonWithoutTeacher();
              setOpen(!open);
            }}
          />
        </Card.Content>
      </Card>
      <Modal
        size="tiny"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Modal.Header>Öğretmene Ders Atama İşlemi</Modal.Header>
        <Modal.Content>
          <p>Lütfen Bir Ders seçiniz...</p>
          <Form.Input
            control="select"
            onChange={(e) => setLessonId(e.target.value)}
          >
            <option value="">Lütfen Ders Seçiniz..</option>
            {lessonsWOTeacher.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.name + " " + lesson.code}
              </option>
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
            onClick={() => {
              assignUserToLesson(lessonId, teacherId);
            }}
            positive
            icon="checkmark"
            labelPosition="right"
            content="Dersi Ata"
          />
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

const mapDispatchToProps = {
  getLessonWithoutTeacher,
  assignUserToLesson,
};

const mapStateToProps = (state) => ({
  lessonsWOTeacher: state.lessonReducer.lessonsWOTeacher,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherAssignLesson);
