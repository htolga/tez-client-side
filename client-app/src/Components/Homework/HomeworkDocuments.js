import React, { Fragment, useState, useEffect } from "react";
import { Card, Table, Button, Modal, Segment, Header, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  uploadDocumentToHomework,
  getHomeworkDocuments,
  downloadHomeworkDocuments,
  deleteHomeworkDocument
} from "../../Redux/Actions/homeworkAction";

const HomeworkDocuments = ({
  user,
  homeworkId,
  uploadDocumentToHomework,
  getHomeworkDocuments,
  homeworkDocuments,
  downloadHomeworkDocuments,
  deleteHomeworkDocument
}) => {
  const [open, setOpen] = useState();
  const [file, setFile] = useState();


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    setOpen(!open);
    let formData = new FormData();
    formData.append("files", file);
    uploadDocumentToHomework(formData, homeworkId);
  };

  const handleDownload = (name,key) => {
    downloadHomeworkDocuments(name,key)
    
 }

 const handleDelete = (documentId) => {
  deleteHomeworkDocument(documentId)
 }

  useEffect(() => {
    getHomeworkDocuments(homeworkId);
  }, [getHomeworkDocuments, homeworkId]);

  return (
    <Fragment>
      <Card fluid>
        <Card.Content textAlign="left">
          <h3>Ödeve ait dökümanlar</h3>
          {homeworkDocuments.length > 0 ? 
        <Table definition>
            
        <Table.Body>

          {homeworkDocuments.map((document) => (
            <Table.Row key={document.id}>
              <Table.Cell>Ödev Doküman adı : {document.fileName}</Table.Cell>
              <Table.Cell>
                <Button
                  content="Ödev Dokümanını İndir"
                  color="linkedin"
                  icon="download"
                  onClick={() => handleDownload(document.fileName,document.fileKey)}
                />
                {user.role !== "Student" ? (
                  <Button
                    content="Ödev Dokümanı Sil"
                    color="red"
                    icon="sistrix"
                    onClick={() => handleDelete(document.fileKey)}
                  />
                ) : null}
              </Table.Cell>
            </Table.Row>
          )) }
        </Table.Body>
      </Table>  
       :  user.role !== "Student" ? 
       <Segment placeholder size="small">
    <Header icon>
      <Icon name='pdf file outline' />
      Verdiğiniz ödeve dair doküman bulunmamaktadır.
    </Header>
    <Button content="Doküman Ekle" color="orange" onClick={() => setOpen(!open)} />
  </Segment> : 
       <h3>Ödeve ait doküman bulunmamaktadır.</h3> }
          
          {user.role !== "Student" ? (
            <Button
              content="Ödev Dokümanı ekle"
              color="orange"
              floated="right"
              onClick={() => setOpen(!open)}
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
        <Modal.Header>Ödev Doküm Yükle</Modal.Header>
        <Modal.Content>
          <p>Lütfen Doküman Seçiniz..</p>
          <input type="file" name="file" onChange={handleFileChange} />
          <Button content="Yükle" positive onClick={handleUpload} />
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Vazgeç
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  homeworkDocuments: state.homeworkReducer.homeworkDocuments,
});

const mapDispatchToProps = {
  uploadDocumentToHomework,
  getHomeworkDocuments,
  downloadHomeworkDocuments,
  deleteHomeworkDocument
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeworkDocuments);
