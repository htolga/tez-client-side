import React, {Fragment, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Segment, Button, Form, Table, Grid} from 'semantic-ui-react'
import { connect } from 'react-redux'
import {getStudents} from '../../Redux/Actions/userAction'



const StudentList = ({students,getStudents}) => {
 
    const [filterEmail, setFilterEmail] = useState("")
    const [filterName, setFilterName] = useState("")
    const [filterSurname, setFilterSurname] = useState("")

    useEffect(()=> {
        getStudents()
    },[getStudents])

    students = students.filter(item => item.email.toLowerCase().startsWith(filterEmail))
    .filter(item => item.name.toLowerCase().startsWith(filterName))
    .filter(item => item.surname.toLowerCase().startsWith(filterSurname)) 

    return (
        <Fragment>
        <Segment>
            <h3 style={{ color : "grey"}}>Öğrenciler</h3>
            <Grid columns="equal" divided>
                <Grid.Row>
                    <Grid.Column width={3} verticalAlign="middle" textAlign="center">
                <Button
                    icon="add user"
                    as={Link}
                    to="/CreateStudent"
                    positive
                    content="Öğrenci oluştur"
                />
                </Grid.Column>
                <Grid.Column width={13} textAlign="left">
                    <h3>Filter</h3>
            <Form>
                <Form.Group widths="equal">
                    <Form.Input fluid name="email" value={filterEmail} onChange={e => setFilterEmail(e.target.value)} placeholder="Email" />
                    <Form.Input fluid name="first_name" value={filterName} onChange={e => setFilterName(e.target.value)} placeholder="İsim" />
                    <Form.Input fluid name="last_name" value={filterSurname} onChange={e => setFilterSurname(e.target.value)} placeholder="Soyisim" />
                </Form.Group>
            </Form>
            </Grid.Column>
            </Grid.Row>
            </Grid>
        </Segment>

            <Table striped style={{textAlign : "center"}} size="small">
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Email Adresi</Table.HeaderCell>
                    <Table.HeaderCell>İsim</Table.HeaderCell>
                    <Table.HeaderCell>Soyisim</Table.HeaderCell>
                    <Table.HeaderCell>İncele</Table.HeaderCell>
                    <Table.HeaderCell>Güncelle</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                    {students.map(student => (
                        <Table.Row key={student.id}>
                        <Table.Cell>{student.email}</Table.Cell>
                        <Table.Cell>{student.name}</Table.Cell>
                        <Table.Cell>{student.surname}</Table.Cell>
                        <Table.Cell>
                            <Button color="blue" content="İncele" as={Link} to={`/StudentDetails/${student.id}`} />
                        </Table.Cell>
                        <Table.Cell>
                            <Button color="green" content="Güncelle" as={Link} to={`/StudentUpdate/${student.id}`} />
                        </Table.Cell>
                    </Table.Row>
                    ))}
                    
                    
                </Table.Body>
            </Table>
            </Fragment>
    )
}
const mapDispatchToProps = {
    getStudents
}


const mapStateToProps = (state) => ({
    students : state.userReducer.students
})

export default connect(mapStateToProps,mapDispatchToProps)(StudentList)
