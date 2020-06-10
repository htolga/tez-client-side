import React from "react";
import "./App.css";
import Navbar from "./Components/Root/Navbar";
import { Container } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";
import Homepage from "./Components/Root/Homepage";
import TeacherList from "./Components/Teacher/TeacherList";
import StudentList from "./Components/Student/StudentList";
import LessonList from "./Components/Lesson/LessonList";
import LoginPage from "./Components/Root/LoginPage";
import CreateTeacher from "./Components/Teacher/CreateTeacher";
import CreateStudent from "./Components/Student/CreateStudent";
import CreateLesson from "./Components/Lesson/CreateLesson";
import TeacherDetails from "./Components/Teacher/TeacherDetails";
import StudentDetails from "./Components/Student/StudentDetails";
import TeacherUpdate from "./Components/Teacher/TeacherUpdate";
import StudentUpdate from "./Components/Student/StudentUpdate";
import TeacherHomepage from "./Components/Teacher/TeacherHomepage";
import StudentHomepage from "./Components/Student/StudentHomepage";
import LessonDetails from "./Components/Lesson/LessonDetails";
import TeacherLesson from "./Components/Teacher/TeacherLesson";
import CreateHomework from "./Components/Homework/CreateHomework";
import HomeworkDetails from "./Components/Homework/HomeworkDetails";
import StudentLesson from "./Components/Student/StudentLesson";
import ProtectedRoute from "./Helpers/ProtectedRoute";
import LessonUpdate from "./Components/Lesson/LessonUpdate";
import HomeworkUpdate from "./Components/Homework/HomeworkUpdate";

function App() {

  return (
    <div className="App">
       <Navbar />
       <Container style={{marginTop : "1em", marginBottom : "2em"}}>
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <ProtectedRoute path="/Homepage" component={Homepage}  />
            <ProtectedRoute path="/TeacherHomepage" component={TeacherHomepage}  />
            <ProtectedRoute path="/StudentHomepage" component={StudentHomepage}  />
            <ProtectedRoute path="/TeacherList" component={TeacherList}  />
            <ProtectedRoute path="/CreateTeacher" component={CreateTeacher}  />
            <ProtectedRoute path="/TeacherDetails/:userId" component={TeacherDetails}  />
            <ProtectedRoute path="/TeacherUpdate/:userId" component={TeacherUpdate}  />
            <ProtectedRoute path="/TeacherLesson" component={TeacherLesson}  />
            <ProtectedRoute path="/StudentList" component={StudentList}  />
            <ProtectedRoute path="/CreateStudent" component={CreateStudent} />
            <ProtectedRoute path="/StudentDetails/:userId" component={StudentDetails} />
            <ProtectedRoute path="/StudentUpdate/:userId" component={StudentUpdate} />
            <ProtectedRoute path="/StudentLesson" component={StudentLesson} />
            <ProtectedRoute path="/LessonList" component={LessonList}  />
            <ProtectedRoute path="/CreateLesson" component={CreateLesson}  />
            <ProtectedRoute path="/LessonUpdate/:lessonId" component={LessonUpdate}  />
            <ProtectedRoute path="/LessonDetails/:lessonId" component={LessonDetails}  />
            <ProtectedRoute path="/CreateHomework/:lessonId" component={CreateHomework}  />
            <ProtectedRoute path="/HomeworkDetails/:homeworkId" component={HomeworkDetails}  />
            <ProtectedRoute path="/HomeworkUpdate/:homeworkId" component={HomeworkUpdate}  />
          </Switch>
       </Container>
    </div>
  );
}

export default App;
