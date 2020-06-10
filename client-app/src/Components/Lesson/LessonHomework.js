import React, { Fragment, useState, useEffect } from "react";
import { Card, Button, Table, Modal, Segment, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getHomeworkByLessonId, deleteHomeworkById } from "../../Redux/Actions/homeworkAction";
import { connect } from "react-redux";

const LessonHomework = ({
  user,
  role,
  lessonId,
  lessonHomework,
  getHomeworkByLessonId,
  deleteHomeworkById
}) => {
  const [open, setOpen] = useState(false);

  const [selectedHomeworkId, setSelectedHomeworkId] = useState()

  const handleDelete = () => {
    deleteHomeworkById(selectedHomeworkId)
  };

  useEffect(() => {
    if (lessonId) {
      getHomeworkByLessonId(lessonId);
    }
  }, [getHomeworkByLessonId, lessonId]);

  return (
    <Fragment>
      <Card fluid>
        <Card.Content textAlign="left">
          <h3>Derse Ait Ödevler</h3>
          {lessonHomework.length > 0 ? 
            <Table definition>
            <Table.Body>
              {lessonHomework.map((homework) => (
                <Table.Row key={homework.id}>
                  <Table.Cell>Ödev adı </Table.Cell>
                  <Table.Cell>{homework.name}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color="blue"
                      content="Ödevi İncele"
                      icon="sistrix"
                      as={Link}
                      to={`/HomeworkDetails/${homework.id}`}
                    />
                    {role === "Admin" || role === "Teacher" ? (
                      <Button
                        color="red"
                        content="Ödevi Sil"
                        onClick={() => {
                          setOpen(true);
                          setSelectedHomeworkId(homework.id)

                        }}
                        icon="delete"
                      />
                    ) : null}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
         :
         user.role !== "Student" ? (
          <Segment placeholder size="small">
            <Header icon>
              <Icon name="pdf file outline" />
              Derse ait Ödev Bulunmamaktadır.
            </Header>
            <Button
              content="Ödev Ekle"
              color="green"
              as={Link} 
              to={`/CreateHomework/${lessonId}`}
            />
          </Segment>
        ) : (
          <h3>Derse Ait Doküman bulunmamaktadır.</h3>
        )
         }
          
          {role === "Admin" || role === "Teacher" ? (
            <Button
              content="Ödev Ekle"
              as={Link}
              to={`/CreateHomework/${lessonId}`}
              positive
              floated="right"
            />
          ) : null}
        </Card.Content>
      </Card>

      <Modal
        size="tiny"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Modal.Header>Ödev Sil</Modal.Header>
        <Modal.Content>
          <p>Ödevi silmek istediğinize emin misiniz ?</p>
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
            onClick={handleDelete}
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

const mapStateToProps = (state) => ({
  lessonHomework: state.homeworkReducer.lessonHomework,
  user : state.authReducer.user
});

const mapDispatchToProps = {
  getHomeworkByLessonId,
  deleteHomeworkById
};

export default connect(mapStateToProps, mapDispatchToProps)(LessonHomework);
