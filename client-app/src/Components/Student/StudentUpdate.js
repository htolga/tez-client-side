import React, { useState, useEffect } from "react";
import { Segment, Form, Card, Table, Input, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserById, updateUser } from "../../Redux/Actions/userAction";

const StudentUpdate = ({ user, match, getUserById, updateUser }) => {
  const [student, setStudent] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    user[name] = value;
    setStudent({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(student);
  };

  useEffect(() => {
    getUserById(match.params.userId);
  }, [getUserById, match]);

  return (
    <Segment stacked>
      <Form onSubmit={handleSubmit}>
        <Card fluid>
          <Card.Content textAlign="left">
            <h3>Öğrenci Güncelle</h3>
            <Table definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Email</Table.Cell>
                  <Table.Cell>
                    <Form.Field
                      name="email"
                      control={Input}
                      value={user.email || ""}
                      onChange={handleInputChange}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>First Name</Table.Cell>
                  <Table.Cell>
                    <Form.Field
                      name="name"
                      control={Input}
                      value={user.name || ""}
                      onChange={handleInputChange}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Last Name</Table.Cell>
                  <Table.Cell>
                    <Form.Field
                      name="surname"
                      control={Input}
                      value={user.surname || ""}
                      onChange={handleInputChange}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Telefon</Table.Cell>
                  <Table.Cell>
                    <Form.Field
                      name="phone"
                      control={Input}
                      value={user.phone || ""}
                      onChange={handleInputChange}
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Card.Content>
        </Card>
        <Button content="Cancel" as={Link} to="/StudentList" />
        <Button positive type="submit" content="Gönder" />
      </Form>
    </Segment>
  );
};

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = {
  getUserById,
  updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentUpdate);
