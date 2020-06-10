import React, { useState, useEffect} from 'react'
import {Link, useHistory } from 'react-router-dom'
import { Segment, Card, Table, Form, Button, Modal } from "semantic-ui-react";
import { getUserById, deleteUserById } from '../../Redux/Actions/userAction';
import { connect } from 'react-redux';
import StudentAssignLesson from './StudentAssignLesson';

const StudentDetails = ({user, match,getUserById,deleteUserById}) => {
    const [open,setOpen] = useState()
   
    const history = useHistory()
   
    const handleDelete = (user_Id) => {
      deleteUserById(user_Id,"Student")
    };
   
   useEffect(()=> {
    getUserById(match.params.userId)
   },[getUserById,match])

    return (
      <Segment clearing>
      <Card color="blue" fluid>
        <Card.Content textAlign="left">
          <h3>Öğrenci Detay Sayfası</h3>
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

      <Button as={Link} size="large" to="/StudentList">
        Listeye Geri Dön
      </Button>
      <Button as={Link} to={`/StudentUpdate/${user.id}`} size="large" positive>
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

      <StudentAssignLesson  studentId={user.id}/>

      <Button floated="right" content="Geri Dön" onClick={() => history.goBack()} />

      <Modal
        size="tiny"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Modal.Header>Öğrenci Sil</Modal.Header>
        <Modal.Content>
          <p>Öğrenciyi silmek istediğinize emin misiniz ?</p>
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
    )
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = {
  getUserById,
  deleteUserById
};



export default connect(mapStateToProps, mapDispatchToProps)(StudentDetails)
