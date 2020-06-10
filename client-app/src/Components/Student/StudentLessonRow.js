import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Modal } from "semantic-ui-react";
import { deleteUserInLesson } from "../../Redux/Actions/lessonAction";
import { connect } from "react-redux";

const StudentLessonRow = ({ lesson, studentId, deleteUserInLesson }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
      deleteUserInLesson(lesson.id,studentId)
  }

  return (
    <Fragment>
      <Table.Row >
        <Table.Cell>Ders Adı</Table.Cell>
        <Table.Cell>{lesson.name}</Table.Cell>
        <Table.Cell>
          <Button
            content="Dersi incele"
            color="linkedin"
            as={Link}
            to={`/LessonDetails/${lesson.id}`}
          />
          <Button content="Dersi Kaldır" color="red" onClick={() => setOpen(!open)} />
        </Table.Cell>
      </Table.Row>

      <Modal
        size="tiny"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Modal.Header>Dersi Öğrenciden Sil</Modal.Header>
        <Modal.Content>
          <p>Öğrenciye atanmış dersi silmek istediğinize emin misiniz ?</p>
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
            onClick={handleDelete}
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
  deleteUserInLesson,
};

export default connect(null, mapDispatchToProps)(StudentLessonRow);
