import React, { useState, Fragment } from "react";
import {useDispatch, connect} from 'react-redux';
import { Link } from "react-router-dom";
import { Table, Button, Modal } from "semantic-ui-react";
import {deleteUserInLesson} from '../../Redux/Actions/lessonAction'

const LessonTeacherRow = ({ lessonTeacher, deleteUserInLesson, lessonId }) => {

    

    const handleDelete = () => {
        deleteUserInLesson(lessonId,lessonTeacher.id)
    }

  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              {lessonTeacher.name + " " + lessonTeacher.surname}
            </Table.Cell>
            <Table.Cell>
              <Button
                content="Öğretmeni İncele"
                color="linkedin"
                as={Link}
                to={`/TeacherDetails/${lessonTeacher.id}`}
              />
              <Button content="Hocayı Kaldır" color="red" onClick={() => setOpen(!open)} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Modal
        size="tiny"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Modal.Header>Derse Atanmış Öğretmeni Kaldır</Modal.Header>
        <Modal.Content>
          <p>Derse Atanmış Öğretmeni Kaldırmak İstediğinize Emin misiniz?</p>
          
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
                handleDelete()
            } }
            color ="red"
            icon="checkmark"
            labelPosition="right"
            content="Sil"
          />
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

const mapDispatchToProps = {
    deleteUserInLesson
}

export default connect(null,mapDispatchToProps)(LessonTeacherRow);
