import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Table, Button, Modal, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  getLessonByUserId,
  assignUserToLesson,
  getNotOwnedLessonsByUserId,
} from "../../Redux/Actions/lessonAction";
import StudentLessonRow from "./StudentLessonRow";

const StudentAssignLesson = ({
  getLessonByUserId,
  studentId,
  notOwnedLessons,
  userLessons,
  getNotOwnedLessonsByUserId,
  assignUserToLesson,
}) => {
  const [open, setOpen] = useState(false);
  const [lessonId, setLessonId] = useState();

  useEffect(() => {
    getLessonByUserId(studentId);
  }, [getLessonByUserId, studentId]);

  return (
    <Fragment>
      <Card color="blue" fluid>
        <Card.Content textAlign="left">
          <h3>Öğrencinin aldığı dersler</h3>
          {userLessons.length > 0 ? (
            <Table definition>
              <Table.Body>
                {userLessons.map((lesson) => (
                  <StudentLessonRow key={lesson.id} lesson={lesson} studentId={studentId} />
                ))}
              </Table.Body>
            </Table>
          ) : (
            <p>Öğrencinin Dersi Bulunmamaktadır.</p>
          )}
          <Button
            color="orange"
            floated="left"
            onClick={() => {
              setOpen(!open);
              getNotOwnedLessonsByUserId(studentId);
            }}
          >
            Öğrenciye Ders Ekle
          </Button>
        </Card.Content>
      </Card>

      <Modal
        size="tiny"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Modal.Header>Öğrenciye Ders Ekle</Modal.Header>
        <Modal.Content>
          <p>Lütfen listeden ders seçiniz.</p>
          <Form.Input
            control="select"
            onChange={(e) => setLessonId(e.target.value)}
          >
            <option>Ders Seçiniz.</option>
            {notOwnedLessons.map((lesson) => (
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
              assignUserToLesson(lessonId, studentId);
            }}
            positive
            icon="checkmark"
            labelPosition="right"
            content="Onayla"
          />
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

const mapDispatchToProps = {
  getLessonByUserId,
  getNotOwnedLessonsByUserId,
  assignUserToLesson,
};

const mapStateToProps = (state) => ({
  userLessons: state.lessonReducer.userLessons,
  notOwnedLessons: state.lessonReducer.notOwnedLessons,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentAssignLesson);
