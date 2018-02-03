import React, { Component } from 'react';
import './App.css';

import { Nav, NavItem, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { CourseContainer } from './courses/CourseContainer';
import { StudentsContainer } from './students/students-container';
import { TeachersContainer } from './teachers/teachers-container';

import CourseDetail from './courses/CourseDetail';
import CourseEdit from './courses/CourseEdit';
import CourseCreate from './courses/CourseCreate';

import { Login } from './login/login';

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
            <Route exact path="/" component={CourseContainer} />
            <Route exact path="/login" render={
              props => <Login onTokenChanged={this.onTokenChanged} {...props} />} />
            <Route exact path="/courses" render={props => <CourseContainer {...props} />} />
            <Route exact path="/teachers" component={TeachersContainer} />
            <Route exact path="/students" component={StudentsContainer} />
            <PrivateRoute exact path="/courses/create" token={this.state.token} render={
              ({ history }) => <CourseCreate history={history} />
            } />
            <Route exact path="/courses/detail" render={
              ({ location, history }) => <CourseDetail detail={location.state.detail}
                history={history} />
            } />
            <Route exact path="/courses/edit" render={
              ({ location, history }) => <CourseEdit detail={location.state.detail} history={history} />
            } />
          </Switch>
        </div>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, token, ...rest }) => (
  <Route {...rest} render={props => (
    token ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
  )} />
)

export default App;