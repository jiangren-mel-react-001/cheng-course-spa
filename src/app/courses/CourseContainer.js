import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Route, Redirect } from 'react-router'

import CourseItem from './CourseItem';
import CourseDetail from './CourseDetail';
import CourseEdit from './CourseEdit';
import CourseCreate from './CourseCreate';


export class CourseContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            courses: []
        };
    }

    componentWillMount() {
        this.setState({loading: true});
        axios.get('https://jr-001-pawpatrol-course-api.herokuapp.com/api/courses')
            .then((response) => this.setState({
                loading: false,
                courses: response.data
            })).catch(error => {
                this.setState({loading: false});
                throw(error);
            });
    }

    onClickDetail = (aCourse) => {
        this.props.history.push({
            pathname: `/course/detail`,
            state: { detail: aCourse }
        });
    }
    
    render() {
        const courses = this.state.courses.map((aCourse, index) => {
            return (
                <div className="col-sm-6 col-md-4" key={index}>
                    <CourseItem {...this.props} item={aCourse} onDetail={this.onClickDetail} />
                </div>
            );
        });
        return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="jumbotron">
                        <h1>Jiangren Courses</h1>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque officiis similique quis voluptatem nemo autem suscipit labore pariatur vitae, cumque enim dolorem laborum, mollitia voluptate sequi culpa consequuntur quia dolores?</p>
                    </div>
                </div>
                <div className="row">
                    <Link className="btn btn-primary" to="/course/create">Add a new course</Link>
                </div>
                <div className="row">
                    {courses}
                </div>
            </div>
            
            <Route exact path="/course/create" render={
                ({ history }) =><CourseCreate history={history} />
            } />
            <Route exact path={`${this.props.match.url}/details`} render={
                ({ location, history }) => <CourseDetail detail={location.state.detail}
                history={history}/>
            }/>
            <Route exact path="/course/edit" render={
                ({ location, history }) => <CourseEdit detail={location.state.detail} history={history} />
            }/>
        </div>
        );
    }
}