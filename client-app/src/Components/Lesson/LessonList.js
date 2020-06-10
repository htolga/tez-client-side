import React, {Fragment, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Segment, Button, Form, Table, Grid} from 'semantic-ui-react'
import {getAllLessons} from '../../Redux/Actions/lessonAction'
import { connect } from 'react-redux'


const LessonList = ({lessons,getAllLessons}) => {

    const [filterName, setFilterName] = useState("")
    const [filterCode, setFilterCode] = useState("")


    useEffect(()=> {
        getAllLessons()
    }, [getAllLessons])

    lessons = lessons.filter(item => item.name.toLowerCase().startsWith(filterName)).filter(item => item.code.toLowerCase().startsWith(filterCode))

    return (
        <Fragment>
        <Segment>
            <h3 style={{ color : "grey"}}>Dersler</h3>
            <Grid columns="equal" divided>
                <Grid.Row>
                    <Grid.Column verticalAlign="middle" textAlign="center" width={3}>
                <Button
                    as={Link}
                    to="/CreateLesson"
                    positive
                    content="Ders oluştur"
                />
                </Grid.Column>
                <Grid.Column width={13} textAlign="left" >
                    <h3>Filter</h3>
                <Form>
                <Form.Group widths="equal">
                    <Form.Input fluid name="name" value={filterName} onChange={e => setFilterName(e.target.value)} placeholder="Ders Adı" />
                    <Form.Input fluid name="code" value={filterCode} onChange={e => setFilterCode(e.target.value)} placeholder="Ders Kodu" />
                </Form.Group>
            </Form>
            </Grid.Column>
            </Grid.Row>
            </Grid>
        </Segment>
            <Table striped style={{textAlign : "center"}} size="small">
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Ders Adı</Table.HeaderCell>
                    <Table.HeaderCell>Ders Kodu</Table.HeaderCell>
                    <Table.HeaderCell>İncele</Table.HeaderCell>
                    <Table.HeaderCell>Güncelle</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                    {lessons.map(lesson => (
                        <Table.Row key={lesson.id}>
                        <Table.Cell>{lesson.name}</Table.Cell>
                        <Table.Cell>{lesson.code}</Table.Cell>
                        <Table.Cell>
                            <Button color="blue" content="İncele" as={Link} to={`/LessonDetails/${lesson.id}`} />
                        </Table.Cell>
                        <Table.Cell>
                            <Button color="green" content="Güncelle" />
                        </Table.Cell>
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            </Fragment>
    )
}

const mapStateToProps = (state) => ({
    lessons : state.lessonReducer.lessons
})

const mapDispatchToProps = {
    getAllLessons
}

export default connect(mapStateToProps,mapDispatchToProps)(LessonList)
