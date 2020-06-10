import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Segment, Table, Icon, Button, Modal } from "semantic-ui-react";
import { deleteLesson } from "../../Redux/Actions/lessonAction";
import { connect } from "react-redux";

const LessonInfo = ({ lesson, deleteLesson }) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Segment clearing>
        <h3>
          <Icon name="info" /> Ders Bilgileri
        </h3>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Ders Adı</Table.Cell>
              <Table.Cell>{lesson.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Ders İçeriği</Table.Cell>
              <Table.Cell>{lesson.description}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Ders Kodu</Table.Cell>
              <Table.Cell>{lesson.code}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Button content="Dersi Sil" negative size="large" floated="right" onClick={() => setOpen(true)} />
        <Button
          content="Dersi Güncelle"
          positive
          size="large"
          as={Link}
          to={`/LessonUpdate/${lesson.id}`}
          floated="right"
        />
        <Button
          content="Listeye Geri Dön"
          size="large"
          floated="right"
          as={Link}
          to={"/LessonList"}
        />
      </Segment>
      <Modal
        size="tiny"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Modal.Header>Dersi Sil</Modal.Header>
        <Modal.Content>
          <p>Dersi silmek istediğinize emin misiniz ?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            negative
          >
            Hayır
          </Button>
          <Button
            onClick={() => {deleteLesson(lesson.id)}}
            positive
            icon="checkmark"
            labelPosition="right"
            content="Evet"
          />
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

const mapDispatchToProps = {
  deleteLesson,
};

export default connect(null, mapDispatchToProps)(LessonInfo);
