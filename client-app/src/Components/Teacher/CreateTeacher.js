import React, { useState } from "react";
import { Segment, Form, Card, Table, Input, Button } from "semantic-ui-react";
import {createUser} from '../../Redux/Actions/userAction'
import { connect } from "react-redux";

const CreateTeacher = ({createUser}) => {

  const [teacher,setTeacher] = useState({
    userRole : "Teacher",
    
  })

  const handleInputChange = (e) => {
    const {name, value} = e.currentTarget;
    setTeacher({...teacher, [name] : value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(teacher,"Teacher")
  }

  return (
    <Segment>
      <Form onSubmit={handleSubmit}>
        <Card color="blue" fluid>
           
          <Card.Content textAlign="left">
            <h3>Öğretmen Oluştur</h3>

            <Table definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Email</Table.Cell>
                  <Table.Cell>
                    <Form.Field control={Input} name="Email" onChange={handleInputChange}  />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>İsim</Table.Cell>
                  <Table.Cell>
                    <Form.Field control={Input} name="Name" onChange={handleInputChange}  />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Soyisim</Table.Cell>
                  <Table.Cell>
                    <Form.Field name="Surname" control={Input} onChange={handleInputChange} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Telefon Numarası</Table.Cell>
                  <Table.Cell>
                    <Form.Field name="Phone" control={Input} onChange={handleInputChange} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Şifre</Table.Cell>
                  <Table.Cell>
                    <Form.Field name="Password" control={Input} onChange={handleInputChange} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Kullanıcı Adı</Table.Cell>
                  <Table.Cell>
                    <Form.Field name="userName" placeholder="İsim ve soy isim türkçe karakter içermeyecek şekilde yazılmalı" control={Input} onChange={handleInputChange} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                  </Table.Cell>
                  <Table.Cell>
                      <Button type="submit" positive content="Oluştur" />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Card.Content>
        </Card>
      </Form>
    </Segment>
  );
};

const mapDispatchToProps = {
  createUser
}

export default connect(null,mapDispatchToProps)(CreateTeacher);
