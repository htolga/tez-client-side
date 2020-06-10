import React from 'react'
import {Segment, Button, CardGroup, Card, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

const AdminHomepage = ({user}) => {
    return (
    <Segment>
      <CardGroup centered itemsPerRow={3}>
        <Card color="blue">
          <Card.Header>
            <h3>Öğretmen İşlemleri</h3>
          </Card.Header>
          <Card.Content>
            <Image src={"teacher.png"} />
          </Card.Content>
          <Card.Content extra>
            <Button as={Link} to="/CreateTeacher" primary color="orange">
              Öğretmen Oluştur
            </Button>
            <br />
            <br />
            <Button secondary color="linkedin" as={Link} to={"/TeacherList"}>
              Öğretmenleri Listele
            </Button>
          </Card.Content>
        </Card>
        <Card color="blue">
          <Card.Header>
            <h3>Öğrenci İşlemleri</h3>
          </Card.Header>
          <Card.Content>
            <Image fluid src={"student.png"} />
          </Card.Content>
          <Card.Content extra>
            <Button primary color="green" as={Link} to={"/CreateStudent"}>
              Öğrenci Oluştur
            </Button>
            <br />
            <br />
            <Button as={Link} to="/StudentList" secondary color="linkedin">
              Öğrencileri Listele
            </Button>
          </Card.Content>
        </Card>
        <Card color="blue">
          <Card.Header>
            <h3>Ders İşlemleri</h3>
          </Card.Header>
          <Card.Content>
            <Image fluid src={"lesson.png"} />
          </Card.Content>
          <Card.Content extra>
            <Button primary color="red" as={Link} to={"/CreateLesson"}>
              Ders Oluştur
            </Button>
            <br />
            <br />
            <Button secondary color="linkedin" as={Link} to={"/LessonList"}>
              Dersleri Listele
            </Button>
          </Card.Content>
        </Card>
      </CardGroup>
    </Segment>
    )
}

const mapStateToProps = (state) => ({
    user : state.authReducer.user
})

export default connect(mapStateToProps,null)(AdminHomepage)
