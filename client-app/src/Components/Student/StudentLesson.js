import React from 'react'
import { Segment, Card, Table, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const StudentLesson = () => {
    return (
        <Segment>
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
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
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
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Card.Content>
      </Card>
        </Segment>
    )
}

export default StudentLesson
