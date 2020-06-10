import React, { useState } from "react";
import { Segment, Form, Table, Button, Input, TextArea } from "semantic-ui-react";
import { connect } from "react-redux";
import {addHomeworkToLesson} from '../../Redux/Actions/homeworkAction'

const CreateHomework = ({addHomeworkToLesson,match}) => {

  const [homework, setHomework] = useState({
    LessonId : parseInt(match.params.lessonId)
  })
 
  const handleInputChange = (e) => {
    const {name, value} = e.currentTarget;
    setHomework({...homework, [name] : value})
  }

  const handleSubmit = (e) => { 
    e.preventDefault();
    console.log(homework)
    addHomeworkToLesson(homework)
  }


  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <h1>Ödev oluştur</h1>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Ödevin adı</Table.Cell>
              <Table.Cell>
                <Form.Field name="Name" control={Input} onChange={handleInputChange} />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Ödevin İçeriği</Table.Cell>
              <Table.Cell>
                <Form.Field name="Description" control={TextArea} onChange={handleInputChange} />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Son Teslim Tarihi</Table.Cell>
              <Table.Cell>
                <Form.Input name="Deadline" type="date" onChange={handleInputChange} />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Button floated="right" content="Oluştur" positive />

        <Button floated="right" content="İptal" />
      </Form>
    </Segment>
  );
};

const mapDispatchToProps = {
  addHomeworkToLesson
}

export default connect(null,mapDispatchToProps)(CreateHomework);
