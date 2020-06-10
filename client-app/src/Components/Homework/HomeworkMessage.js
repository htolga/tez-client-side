import React from "react";
import { Message } from "semantic-ui-react";
import { connect } from "react-redux";

const HomeworkMessage = ({user}) => {
  return (
    <Message negative>
      <Message.Header>{user.role === "Teacher" ? "Ödevin Süresi Dolmuş." : "Ödev Gönderemezsiniz !"}</Message.Header>
      <p>{user.role === "Teacher" ? "Ödevi sistemden silmenizi rica ederiz." : "Derse ait verilmiş ödeve teslim tarihi geçtiğinden dolayı ödev gönderemezsiniz."}</p>
    </Message>
  );
};

const mapStateToProps = (state) => ({
  user : state.authReducer.user
})

export default connect(mapStateToProps,null)(HomeworkMessage);
