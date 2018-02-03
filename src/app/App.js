import React, { Component } from 'react';
import './App.css';

import { Nav, NavItem, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { CourseContainer } from './courses/CourseContainer';
import { StudentsContainer } from './students/students-container';
import { TeachersContainer } from './teachers/teachers-container';

import CourseItem from './courses/CourseItem';
import CourseDetail from './courses/CourseDetail';
import CourseEdit from './courses/CourseEdit';
import CourseCreate from './courses/CourseCreate';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                Jiangren
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <LinkContainer to="/courses">
                  <NavItem>COURSES</NavItem>
                </LinkContainer>
                <LinkContainer to="/teachers">
                  <NavItem>TEACHERS</NavItem>
                </LinkContainer>
                <LinkContainer to="/students">
                  <NavItem>STUDENTS</NavItem>
                </LinkContainer>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} href="#">
                  Login
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route exact path="/" component={CourseContainer} />
            <Route exact path="/courses" render={props => <CourseContainer {...props} />}/>
            <Route exact path="/teachers" component={TeachersContainer} />
            <Route exact path="/students" component={StudentsContainer} />
                <Route exact path="/courses/create" render={
                    ({ history }) =><CourseCreate history={history} />
                } />
                <Route exact path="/courses/detail" render={
                    ({ location, history }) => <CourseDetail detail={location.state.detail}
                    history={history}/>
                }/>
                <Route exact path="/courses/edit" render={
                    ({ location, history }) => <CourseEdit detail={location.state.detail} history={history} />
                }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;