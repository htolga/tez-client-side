import React, { useEffect } from "react";
import { Segment, CardGroup, Card, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getLessonByUserId } from "../../Redux/Actions/lessonAction";

const TeacherHomepage = ({ userLessons, user, getLessonByUserId }) => {
  useEffect(() => {
    getLessonByUserId(user.id);
  }, [getLessonByUserId, user]);

  return (
    <Segment>
      <h3 style={{ color: "lightgrey" }}>Öğretmen olarak giriş yaptınız.</h3>
      <h2>{userLessons.length > 0 ?  "Üzerinize atanmış dersler" : "Üzerinize Atanmış Ders Bulunmamaktadır"}</h2>
      <CardGroup itemsPerRow={3}>
        {userLessons &&
          userLessons.map((lesson) => (
            <Card color="blue" key={lesson.id}>
              <Card.Header>
                <h3>{lesson.name}</h3>
              </Card.Header>
              <Card.Content>
                <p>{lesson.description}</p>
                <Button
                  content="İncele"
                  color="linkedin"
                  as={Link}
                  to={`/LessonDetails/${lesson.id}`}
                />
              </Card.Content>
            </Card>
          )) }
      </CardGroup>
    </Segment>
  );
};

const mapDispatchToProps = {
  getLessonByUserId,
};

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  userLessons: state.lessonReducer.userLessons,
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherHomepage);
