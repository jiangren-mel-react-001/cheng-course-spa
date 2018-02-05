import React, { Component } from 'react';
import './App.css';

import { Nav, NavItem, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { CourseContainer } from './courses/CourseContainer';
import { StudentsContainer } from './students/students-container';
import { TeachersContainer } from './teachers/teachers-container';

import CourseDetail from './courses/CourseDetail';
import CourseEdit from './courses/CourseEdit';
import CourseCreate from './courses/CourseCreate';

import { Login } from './login/login';

import { PublicRoute, AuthRoute } from './shared/AuthRoute';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ''
    };
    this.onTokenChanged = this.onTokenChanged.bind(this);
  }
  onTokenChanged(newToken) {
    this.setState({
      token: newToken
    })
  }
  render() {
    const loginLink = this.state.token ? (
      <LinkContainer to="/">
        <NavItem onClick={() => this.setState({ token: '' })}>Logout</NavItem>
      </LinkContainer>
    ) : (
        <LinkContainer to="/login">
          <NavItem>Login</NavItem>
        </LinkContainer>
    );

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
                {loginLink}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <PublicRoute exact path="/" token={this.state.token} componentRender={{component: CourseContainer}} />
            <PublicRoute exact path="/login" token={this.state.token} componentRender={{
              component: Login,
              onTokenChanged: this.onTokenChanged
            }} />
            <PublicRoute exact path="/courses" token={this.state.token} componentRender={{component: CourseContainer}} />
            <AuthRoute exact path="/teachers" token={this.state.token}
              componentRender={{component: TeachersContainer}} />
            <AuthRoute exact path="/students" token={this.state.token}
              componentRender={{component: StudentsContainer}} />
            <AuthRoute exact path="/courses/create" token={this.state.token}
              componentRender={{component: CourseCreate}} />
            <PublicRoute exact path="/courses/detail" token={this.state.token} componentRender={{component: CourseDetail}} />
            <AuthRoute exact path="/courses/edit" token={this.state.token}
              componentRender={{component: CourseEdit}} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;