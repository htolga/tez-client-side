import React, { useState, useEffect } from "react";
import { Segment, Form, Card, Table, Input, Button } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {getUserById, updateUser} from '../../Redux/Actions/userAction'

const TeacherUpdate = ({user,match,getUserById, updateUser}) => {

  const [teacher,setTeacher] = useState();

  const history = useHistory()

  const handleInputChange = (e) => {
    const {name, value} = e.currentTarget;
    user[name] = value
    setTeacher({...user, [name] : value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(teacher)
  }

  useEffect(() => {
    getUserById(match.params.userId)
  }, [getUserById,match])

  return (
    <Segment stacked>
      <Form onSubmit={handleSubmit}>
        <Card fluid>
          <Card.Content textAlign="left">
            <h3>Öğretmen Güncelle</h3>
            <Table definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Email</Table.Cell>
                  <Table.Cell>
                    <Form.Field name="email" control={Input} value={user.email ||""} onChange={handleInputChange}  />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>İsim</Table.Cell>
                  <Table.Cell>
                    <Form.Field name="name" control={Input} value={user.name || ""} onChange={handleInputChange}  />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Soyisim</Table.Cell>
                  <Table.Cell>
                    <Form.Field name="surname" control={Input}  value={user.surname || ""} onChange={handleInputChange}   />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Telefon Numarası</Table.Cell>
                  <Table.Cell>
                    <Form.Field name="phone" control={Input}  value={user.phone || ""} onChange={handleInputChange}   />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Card.Content>
        </Card>
        <Button content="Cancel" as={Link} onClick={() => history.goBack()} />
        <Button positive type="submit" content="Güncelle" />
      </Form>
    </Segment>
  );
};

const mapStateToProps = (state) => ({
  user : state.userReducer.user
})

const mapDispatchToProps = {
  getUserById,
  updateUser
}


export default connect(mapStateToProps,mapDispatchToProps)(TeacherUpdate);
