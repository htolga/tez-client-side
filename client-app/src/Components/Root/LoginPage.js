import React from "react";
import LoginForm from "../Login/LoginForm";
import { Segment } from "semantic-ui-react";

const LoginPage = () => {
  return (
    <Segment textAlign="center" vertical style={{ marginTop: "5em" }}>
        <LoginForm />
    </Segment>
  );
};

export default LoginPage;
