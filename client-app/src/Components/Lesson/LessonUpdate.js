import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Segment, Form, Table, Button, Card, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import { getLessonById, updateLesson } from "../../Redux/Actions/lessonAction";

const LessonUpdate = ({ lesson, match, updateLesson, getLessonById }) => {
  
  const [tempLesson, setTempLesson] = useState()
    const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    lesson[name] = value
    setTempLesson({...lesson, [name] : value})
  };

  const handleSubmit = (e) => {
      e.preventDefault()
      updateLesson(tempLesson,match.params.lessonId)
  };

  useEffect(() => {
    getLessonById(match.params.lessonId);
  }, [getLessonById,match]);

  return (
    <Segment stacked>
      <Form onSubmit={handleSubmit}>
        <Card fluid>
          <Card.Content textAlign="left">
            <h3>Ders Güncelle</h3>
            <Table definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Ders Adı</Table.Cell>
                  <Table.Cell>
                    <Form.Field
                      name="name"
                      control={Input}
                      value={lesson.name || ""}
                      onChange={handleInputChange}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Ders Açıklaması</Table.Cell>
                  <Table.Cell>
                    <Form.Field
                      name="description"
                      control={Input}
                      value={lesson.description || ""}
                      onChange={handleInputChange}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Ders Kodu</Table.Cell>
                  <Table.Cell>
                    <Form.Field
                      name="code"
                      control={Input}
                      value={lesson.code || ""}
                      onChange={handleInputChange}
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Card.Content>
        </Card>
        <Button content="Cancel" as={Link} to="/LessonList" />
        <Button positive type="submit" content="Güncelle" />
      </Form>
    </Segment>
  );
};

const mapDispatchToProps = {
  getLessonById,
  updateLesson
};

const mapStateToProps = (state) => ({
  lesson: state.lessonReducer.lesson,
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonUpdate);
