import React, {useState} from 'react'
import { Segment, Card, Table, Button, Modal } from "semantic-ui-react";
import { Link } from 'react-router-dom';


const TeacherLesson = ({match}) => {

  const [open, setOpen] = useState(false);
  const [openn, setOpenn] = useState(false);
  const handleDelete = () => {};
    return (
        <Segment textAlign="left" clearing>
        <h1>Fizik</h1>
      <Card fluid>
        <Card.Content textAlign="left">
          <h3>Derse Ait Dokümanlar</h3>
          <Table definition>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Doküman adı : Falan.txt</Table.Cell>
                <Table.Cell>
                  <Button
                    color="linkedin"
                    content="Dokümanı indir"
                    icon="file alternate outline"
                  />
                  <Button color="red" content="Dokümanı Sil" icon="delete" />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Doküman adı : Filan.txt</Table.Cell>
                <Table.Cell>
                  <Button
                    color="linkedin"
                    content="Dokümanı indir"
                    icon="file alternate outline"
                  />
                  <Button color="red" content="Dokümanı Sil" icon="delete" onClick={() => setOpenn(true) } />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Doküman adı : Test.txt</Table.Cell>
                <Table.Cell>
                  <Button
                    color="linkedin"
                    content="Dokümanı indir"
                    icon="file alternate outline"
                  />
                   <Button color="red" content="Dokümanı Sil" icon="delete" /> 
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Button content="Doküman Ekle" positive floated="right" />
        </Card.Content>
      </Card>
      <Card fluid>
        <Card.Content textAlign="left">
          <h3>Derse Ait Ödevler</h3>
          <Table definition>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Ödev adı : Falan ödevi</Table.Cell>
                <Table.Cell>
                  <Button color="blue" content="Ödevi İncele" icon="sistrix" as={Link} to="/HomeworkDetails" />
                  <Button
                    color="red"
                    content="Ödevi Sil"
                    onClick={() => {
                      setOpen(true);
                    }}
                    icon="delete"
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Button content="Ödev Ekle" positive floated="right" to="/CreateHomework" />
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
            onClick={() => {
              handleDelete(match.params.customerId);
            }}
            positive
            icon="checkmark"
            labelPosition="right"
            content="Evet"
          />
        </Modal.Actions>
      </Modal>
      <Modal
        size="tiny"
        open={openn}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Modal.Header>Dokümanı Sil</Modal.Header>
        <Modal.Content>
          <p> silmek istediğinize emin misiniz ?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              setOpenn(false);
            }}
            negative
          >
            Hayır
          </Button>
          <Button
            onClick={() => {
              handleDelete(match.params.customerId);
            }}
            positive
            icon="checkmark"
            labelPosition="right"
            content="Evet"
          />
        </Modal.Actions>
      </Modal>
      
    </Segment>
    )
}

export default TeacherLesson
