import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ isLogged, ...props }) => {
  return isLogged ? <Route {...props} /> : <Redirect to="/" />;
};

const mapStateToProps = (state) => ({
  isLogged: state.authReducer.isLogged,
});

export default connect(mapStateToProps)(ProtectedRoute);
