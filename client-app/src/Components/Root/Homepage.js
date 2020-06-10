import React from "react";
import { connect } from "react-redux";
import StudentHomepage from "../Student/StudentHomepage";
import TeacherHomepage from "../Teacher/TeacherHomepage";
import AdminHomepage from "./AdminHomepage";

const Homepage = ({user}) => {
  switch(user.role){
      case "Student":
        return <StudentHomepage />
      case "Teacher":
        return <TeacherHomepage />;
      case "Admin":
        return <AdminHomepage /> ; 
      default:
        return null 
  }
  
};

const mapStateToProps = (state) => ({
  user : state.authReducer.user
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps,mapDispatchToProps)(Homepage);
