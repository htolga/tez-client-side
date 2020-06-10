import React, { useState, useEffect } from "react";
import {
  Segment,
  Icon,
  Button,
  Radio,
  Input,
  Card,
  Grid,
} from "semantic-ui-react";
import { connect } from "react-redux";
import {
  getStudentByLesson,
  
} from "../../Redux/Actions/lessonAction";
import { Link } from "react-router-dom";

const LessonStudents = ({ lessonStudents, getStudentByLesson, lessonId }) => {
  const [open, setOpen] = useState(false);

  const [filterName, setFilterName] = useState("")


  useEffect(() => {
    getStudentByLesson(lessonId)
  }, [getStudentByLesson,lessonId])

  lessonStudents = lessonStudents.filter(item => item.name.toLowerCase().startsWith(filterName))
  
  return (
    <Segment>
      <h3>
        <Icon name="child" />
        Dersi Alan Öğrenciler
      </h3>
      { lessonStudents.length > 0 ? 
      <Grid>
        <Grid.Row>
          <Grid.Column width={2} verticalAlign="middle">
            <Radio
              toggle
              label={open ? "Gizle" : "Göster"}
              onChange={() => setOpen(!open)}
            />
          </Grid.Column>
          <Grid.Column width={3}>
            <Input
              placeholder="İsme göre filtreleme"
              style={{ display: open ? null : "none" }}
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid> : <h4>Dersi Alan öğrenci bulunmamaktadır</h4> }
      

      <Card.Group itemsPerRow={5} style={{ display: open ? null : "none" }}>
        {lessonStudents.map((student) => (
          <Card color="teal" key={student.id}>
            <Card.Content textAlign="center">
              <h4>{student.name + " " +student.lastname}</h4>
              <Button color="teal" content="Öğrenciyi incele" as={Link} to={`/StudentDetails/${student.id}`} />
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Segment>
  );
};

const mapStateToProps = (state) => ({
  lessonStudents: state.lessonReducer.lessonStudents,
});

const mapDispatchToProps = {
  getStudentByLesson,
};

export default connect(mapStateToProps, mapDispatchToProps)(LessonStudents);
