import React, { Fragment, useState, useEffect } from "react";
import { Card, Table, Button, Modal, Segment, Header, Icon } from "semantic-ui-react";
import { getLessonDocuments, uploadDocumentToLesson,deleteLessonDocument,downloadLessonDocuments } from "../../Redux/Actions/lessonAction";
import { connect } from "react-redux";

const LessonDocuments = ({
  role,
  user,
  lessonId,
  getLessonDocuments,
  uploadDocumentToLesson,
  lessonDocuments,
  deleteLessonDocument,
  downloadLessonDocuments
}) => {
  const [open, setOpen] = useState(false);
 
  const [file,setFile] = useState()

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (lessonId) => {
    setOpen(!open);
    let formData = new FormData();
    formData.append("files", file);
    uploadDocumentToLesson(formData,lessonId)
  }


  const handleDowload = (name,key) => {
    downloadLessonDocuments(name,key)
  }
 
  const handleDelete = (documentId) => {
    deleteLessonDocument(documentId)
  };

  useEffect(() => {
    if(lessonId){
    getLessonDocuments(lessonId);
    }
  }, [getLessonDocuments, lessonId]);

  return (
    <Fragment>
      <Card fluid>
        <Card.Content textAlign="left">
          <h3>Derse Ait Dokümanlar</h3>
          {lessonDocuments.length > 0 ? (
            <Table definition>
              <Table.Body>
                {lessonDocuments.map((document) => (
                  <Table.Row key={document.id}>
                    <Table.Cell>Doküman adı : {document.fileName}</Table.Cell>
                    <Table.Cell>
                      <Button
                        color="linkedin"
                        content="Dokümanı indir"
                        onClick={() => handleDowload(document.fileName,document.fileKey)}
                        icon="file alternate outline"
                      />
                      {role === "Admin" || role === "Teacher" ? (
                        <Button
                          color="red"
                          content="Dokümanı Sil"
                          icon="delete"
                          onClick={() => handleDelete(document.fileKey)}
                        />
                      ) : null}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : user.role !== "Student" ? (
            <Segment placeholder size="small">
              <Header icon>
                <Icon name="pdf file outline" />
                Derse ait Doküman bulunmamaktadır.
              </Header>
              <Button
                content="Doküman Ekle"
                color="orange"
                onClick={() => setOpen(!open)}
              />
            </Segment>
          ) : (
            <h3>Derse Ait Doküman bulunmamaktadır.</h3>
          )}

          {role === "Admin" || role === "Teacher" ? (
            <Button content="Doküman Ekle" positive floated="right" onClick={() => setOpen(!open)} />
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
        <Modal.Header>Doküman Ekleme</Modal.Header>
        <Modal.Content>
          <p>Lütfen Doküman Seçiniz..</p>
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
            onClick={() => {handleUpload(lessonId)}}
            positive
            icon="checkmark"
            labelPosition="right"
            content="Yükle"
          />
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

const mapDispatchToProps = {
  getLessonDocuments,
  uploadDocumentToLesson,
  deleteLessonDocument,
  downloadLessonDocuments
};

const mapStateToProps = (state) => ({
  lessonDocuments: state.lessonReducer.lessonDocuments,
  user : state.authReducer.user
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonDocuments);
