import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { deleteUserInLesson } from "../../Redux/Actions/lessonAction";
import { Table, Button, Modal } from "semantic-ui-react";
import { connect } from "react-redux";

const TeacherLessonRow = ({ lesson, deleteUserInLesson, teacherId }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    deleteUserInLesson(lesson.id, teacherId);
  };

  return (
    <Fragment>
      <Table.Row key={lesson.id}>
        <Table.Cell>Ders Adı</Table.Cell>
        <Table.Cell>{lesson.name}</Table.Cell>
        <Table.Cell>
          <Button
            content="Dersi incele"
            color="linkedin"
            as={Link}
            to={`/LessonDetails/${lesson.id}`}
          />
          <Button
            content="Dersi Kaldır"
            color="red"
            onClick={() => setOpen(!open)}
          />
        </Table.Cell>
      </Table.Row>

      <Modal
        size="tiny"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Modal.Header>Dersi Öğretmenden Sil</Modal.Header>
        <Modal.Content>
          <p>Öğretmene atanmış dersi silmek istediğinize emin misiniz ?</p>
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
    deleteUserInLesson
}

export default connect(null,mapDispatchToProps)(TeacherLessonRow);
