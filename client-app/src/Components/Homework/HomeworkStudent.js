import React, { Fragment, useState } from "react";
import { Segment, Card, Button, Input, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { getAllStudentHomeworkByHomeworkId, downloadStudentHomework } from "../../Redux/Actions/homeworkAction";
import { useEffect } from "react";

const HomeworkStudent = ({
  studentHomeworks,
  getAllStudentHomeworkByHomeworkId,
  homeworkId,
  downloadStudentHomework
}) => {
  const [filter, setFilter] = useState("");

  const handleDownload = (name,key) => {
      downloadStudentHomework(name,key)
  }

  useEffect(() => {
    if (homeworkId) {
      getAllStudentHomeworkByHomeworkId(homeworkId);
    }
  }, [getAllStudentHomeworkByHomeworkId, homeworkId]);

  studentHomeworks = studentHomeworks.filter((item) =>
    item.fileName.toLowerCase().startsWith(filter)
  );

  return (
    <Segment clearing>
      <h3>Gönderilmiş Öğrenci Ödevleri</h3>
      <div>
            <Input
              label="Dosya ismine göre filtrele"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="filtrele"
            />
            <br />
            <br />
          </div>
      {studentHomeworks.length > 0 ? (
        <Fragment>
          
          <Card.Group itemsPerRow={5}>
            {studentHomeworks.map((homework) => (
              <Card color="teal" key={homework.id}>
                <Card.Content textAlign="center">
                  <h4>{homework.fileName.split('.').slice(0, -1).join('.')}</h4>
                  <Button color="teal" content="Ödevi indir" onClick={() => handleDownload(homework.fileName,homework.fileKey)} />
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Fragment>
      ) : (
        <h2>Gönderilmiş ödev bulunmamaktadır.</h2>
      )}
    </Segment>
  );
};

const mapStateToProps = (state) => ({
  studentHomeworks: state.homeworkReducer.studentHomeworks,
});

const mapDispatchToProps = {
  getAllStudentHomeworkByHomeworkId,
  downloadStudentHomework
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeworkStudent);
