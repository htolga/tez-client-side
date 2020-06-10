import React, { useEffect, useState } from "react";
import { Segment, Card, Table, Form, Button, Modal } from "semantic-ui-react";
import { useHistory, Link } from "react-router-dom";
import {
  getHomeworkById,
  deleteHomeworkById,
  getHomeworkDeadlineBoolean,
  uploadStudentHomework,
  checkStudentHomework,
} from "../../Redux/Actions/homeworkAction";
import { connect } from "react-redux";
import HomeworkDocuments from "./HomeworkDocuments";
import HomeworkMessage from "./HomeworkMessage";
import HomeworkStudent from "./HomeworkStudent";
import HomeworkCheckMessage from "./HomeworkCheckMessage";

const HomeworkDetails = ({
  getHomeworkById,
  homework,
  match,
  user,
  deleteHomeworkById,
  deadline,
  getHomeworkDeadlineBoolean,
  uploadStudentHomework,
  checkStudentHomework,
  checkHomework,
}) => {
  const history = useHistory();

  const [file, setFile] = useState();
  const [open, setOpen] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadHomework = () => {
    setOpen(!open);
    let formData = new FormData();
    formData.append("files", file);
    uploadStudentHomework(formData, homework.id, user.id);
  };

  const handleDelete = () => {
    deleteHomeworkById(match.params.homeworkId);
  };

  let date = "";
  if (homework && homework.deadline) {
    date = homework.deadline.substring(0, 10);
    setTimeout(() => {
      getHomeworkDeadlineBoolean();
    }, 100);
  }
  


  useEffect(() => {
    getHomeworkById(match.params.homeworkId);
  }, [getHomeworkById, match]);

  return (
    <Segment clearing textAlign="left">
      <h1>Ödev Detay Sayfası</h1>
      {deadline  && <HomeworkMessage />}
      <HomeworkCheckMessage homeworkId={match.params.homeworkId} userId={user.id} />

      <Form>
        <Card color="blue" fluid>
          <Card.Content textAlign="left">
            <Table definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Ödev Adı</Table.Cell>
                  <Table.Cell>{homework.name}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Ödev İçeriği</Table.Cell>
                  <Table.Cell>{homework.description}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Son Teslim tarihi</Table.Cell>
                  <Table.Cell>
                    <h3 style={{ color: "red" }}>{date}</h3>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

            {user.role === "Student" ? (
              <Button
                disabled={deadline}
                content="Ödev Gönder"
                icon="upload"
                floated="right"
                color="teal"
                onClick={() => setOpen(!open)}
              />
            ) : (
              <Button.Group floated="right">
                <Button
                  content="Ödev Listesine Geri Dön"
                  onClick={() => history.goBack()}
                />

                <Button
                  positive
                  content="Ödevi Güncelle"
                  as={Link}
                  to={`/HomeworkUpdate/${homework.id}`}
                />
                <Button negative content="Ödevi Sil" onClick={handleDelete} />
              </Button.Group>
            )}
          </Card.Content>
        </Card>

        <br />
        <HomeworkDocuments homeworkId={match.params.homeworkId} />
      </Form>
      <Button
        style={{ marginTop: "1em" }}
        content="Geri Dön"
        onClick={() => history.goBack()}
        floated="right"
      />

      {user.role !== "Student" && <HomeworkStudent homeworkId={homework.id} />}

      <Modal
        size="tiny"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Modal.Header>Ödev Yükle</Modal.Header>
        <Modal.Content>
          <p>Lütfen Göndereceğiniz ödev dosyanızı Seçiniz..</p>
          <input type="file" name="file" onChange={handleFileChange} />
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
              handleUploadHomework();
            }}
            positive
            icon="checkmark"
            labelPosition="right"
            content="Yükle"
          />
        </Modal.Actions>
      </Modal>
    </Segment>
  );
};

const mapDispatchToProps = {
  getHomeworkById,
  deleteHomeworkById,
  getHomeworkDeadlineBoolean,
  uploadStudentHomework,
  checkStudentHomework,
};

const mapStateToProps = (state) => ({
  homework: state.homeworkReducer.homework,
  user: state.authReducer.user,
  deadline: state.homeworkReducer.deadline,
  checkHomework: state.homeworkReducer.checkHomework,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeworkDetails);
