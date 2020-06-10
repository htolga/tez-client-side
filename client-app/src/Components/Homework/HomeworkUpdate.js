import React, {useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  Segment,
  Card,
  Table,
  Button,
  Input,
  TextArea,
} from "semantic-ui-react";
import { connect } from "react-redux";
import {getHomeworkById, updateHomeworkById} from '../../Redux/Actions/homeworkAction'

const HomeworkUpdate = ({ homework, match, getHomeworkById, updateHomeworkById }) => {

    let date = null
    if(homework.deadline){
        date = homework.deadline.substring(0,10)
        Date.parse(date)
        homework.deadline = date
    }

  const [tempHomework, setTempHomework] = useState()

  const history = useHistory();

  const handleInputChange = (e) => {
      const{name, value} = e.currentTarget;
    homework[name] = value
    setTempHomework({...homework, [name] : value})
};

  const handleSubmit = (e) => {
    updateHomeworkById(match.params.homeworkId,tempHomework)
  };

  useEffect(() => {
    getHomeworkById(match.params.homeworkId)
  }, [getHomeworkById,match])

  return (
    <Segment stacked>
      <Form onSubmit={handleSubmit}>
        <Card fluid>
          <Card.Content textAlign="left">
            <h3>Ödev Güncelle</h3>
            <Table definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Ödev Adı</Table.Cell>
                  <Table.Cell>
                    <Form.Field
                      name="name"
                      control={Input}
                      value={homework.name || ""}
                      onChange={handleInputChange}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Ödev içeriği</Table.Cell>
                  <Table.Cell>
                    <Form.Field
                      name="description"
                      control={TextArea}
                      value={homework.description || ""}
                      onChange={(handleInputChange)}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Son Teslim Tarihi</Table.Cell>
                  <Table.Cell>
                    <Form.Input
                      value={homework.deadline}
                      name="deadline"
                      type="date"
                      onChange={handleInputChange}
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Card.Content>
        </Card>
        <Button content="Cancel"  onClick={() => history.goBack()} />
        <Button positive type="submit" content="Gönder" />
      </Form>
    </Segment>
  );
};

const mapDispatchToProps = {
    getHomeworkById,
    updateHomeworkById
}

const mapStateToProps = (state) => ({
    homework : state.homeworkReducer.homework
})

export default connect(mapStateToProps,mapDispatchToProps)(HomeworkUpdate);
