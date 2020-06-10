import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Segment, Card, Table, Form, Button, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { getUserById, deleteUserById } from "../../Redux/Actions/userAction";
import { getLessonByUserId } from "../../Redux/Actions/lessonAction";
import TeacherAssignLesson from "./TeacherAssignLesson";

const TeacherDetails = ({
  user,
  match,
  getUserById,
  deleteUserById,
  userLessons,
  getLessonByUserId,
}) => {
  const [open, setOpen] = useState();
  const history = useHistory();
  const handleDelete = (user_Id) => {
    deleteUserById(user_Id, "Teacher");
  };

  useEffect(() => {
    getUserById(match.params.userId);
    getLessonByUserId(match.params.userId);
  }, [getUserById, match, getLessonByUserId]);

  return (
    <Segment>
      <Card color="blue" fluid>
        <Card.Content textAlign="left">
          <h3>Öğretmen Detay Sayfası</h3>
          <Form>
            <Table definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Ünvan</Table.Cell>
                  <Table.Cell>{user.userRole}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Email</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>İsim</Table.Cell>
                  <Table.Cell>{user.name}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Soyisim</Table.Cell>
                  <Table.Cell>{user.surname}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Telefon Numarası</Table.Cell>
                  <Table.Cell>{user.phone}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Form>
        </Card.Content>
      </Card>

      <Button as={Link} size="large" to="/TeacherList">
        Listeye Geri Dön
      </Button>
      <Button as={Link} to={`/TeacherUpdate/${user.id}`} size="large" positive>
        Güncelle
      </Button>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        size="large"
        color="red"
      >
        Sil
      </Button>

      <TeacherAssignLesson userLessons={userLessons} teacherId={user.id} />

      <Button content="Geri Dön" onClick={() => history.goBack()} />

      <Modal
        size="tiny"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Modal.Header>Öğretmen Sil</Modal.Header>
        <Modal.Content>
          <p>Öğretmeni silmek istediğinize emin misiniz ?</p>
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
            onClick={() => {
              handleDelete(match.params.userId);
            }}
            positive
            icon="checkmark"
            labelPosition="right"
            content="Evet"
          />
        </Modal.Actions>
      </Modal>
    </Segment>
  );
};

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  userLessons: state.lessonReducer.userLessons,
});

const mapDispatchToProps = {
  getUserById,
  deleteUserById,
  getLessonByUserId,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDetails);
