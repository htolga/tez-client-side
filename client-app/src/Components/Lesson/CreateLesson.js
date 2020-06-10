import React, { useState } from "react";
import { Segment, Form, Card, Table, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import {createLesson} from '../../Redux/Actions/lessonAction'

const CreateLesson = ({createLesson}) => {

  const [lesson, setLesson] = useState()

  const handleInputChange = (e) => {
    const {name, value} = e.currentTarget;
    setLesson({...lesson, [name] : value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createLesson(lesson)
  }


  return (
    <Segment>
      <Form onSubmit={handleSubmit}>
        <Card color="blue" fluid>
          <Card.Content textAlign="left">
            <h3>Ders Oluştur</h3>
            <Table definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Ders Adı</Table.Cell>
                  <Table.Cell>
                    <Form.Field name="Name" onChange={handleInputChange} control={Input} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Ders içeriği</Table.Cell>
                  <Table.Cell>
                    <Form.Field name="Description" onChange={handleInputChange} control={Input} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Ders Kodu</Table.Cell>
                  <Table.Cell>
                    <Form.Field name="Code" onChange={handleInputChange} control={Input} />
                  </Table.Cell>
                </Table.Row>
                
                <Table.Row>
                  <Table.Cell></Table.Cell>
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
  createLesson
}

export default connect(null, mapDispatchToProps)(CreateLesson);
