import React, { useState, Fragment } from "react";
import { Segment, Menu, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {userLogout} from '../../Redux/Actions/authAction'

import { connect } from "react-redux";

const Navbar = ({user, userLogout, isLogged}) => {

 

  return (
    <Segment inverted>
      <Menu inverted secondary>
        <Container>
          
          {isLogged  && <Menu.Item
            as={Link}
            to="/Homepage"
          >
            <h3>Ana Sayfa</h3>
          </Menu.Item>}
          {user.role === "Admin" ?
          <Fragment>

          <Menu.Item
            name="teacher"
            as={Link}
            to="/TeacherList"

          >
            <h3>Öğretmenler</h3>
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/StudentList"

          >
            <h3>Öğrenciler</h3>
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/LessonList"

          >
            <h3>Dersler</h3>
          </Menu.Item> 
          </Fragment>
          : null}
          <Menu.Menu position="right">
              <Menu.Item>
                    <h5>{user.name  ? user.name+" "+user.surname : "Veri iletişim Platformu" }</h5>
                </Menu.Item>
                 {user.name && <Menu.Item onClick={userLogout} >
                    <h3>Çıkış Yap</h3>
                </Menu.Item>}
          </Menu.Menu>
        </Container>
      </Menu>
    </Segment>
  );
};

const mapStateToProps = (state) => ({
  user : state.authReducer.user,
  isLogged : state.authReducer.isLogged
})

const mapDispatchToProps = {
  userLogout
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
