import React, { useEffect } from "react";
import { Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { checkStudentHomework } from "../../Redux/Actions/homeworkAction";

const HomeworkCheckMessage = ({
  checkHomework,
  checkStudentHomework,
  userId,
  homeworkId,
}) => {

  if(homeworkId & userId)
    checkStudentHomework(homeworkId, userId);

  useEffect(() => {
    
    
  }, []);

  

  return (
    <Message
      style={{
        display: checkHomework ? "Block" : "none",
      }}
      success
      header="Daha önceden ödev gönderdiniz."
      content="Aldığınız ders için verilmiş ödevinizi daha önceden gönderdiniz. Tekrar ödev gönderemezsiniz"
    />
  );
};

const mapDispatchToProps = {
  checkStudentHomework,
};

const mapStateToProps = (state) => ({
  checkHomework: state.homeworkReducer.checkHomework,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeworkCheckMessage);
