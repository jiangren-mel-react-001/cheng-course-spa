import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Spinner } from '../shared/Spinner';
import {LessonItem } from './LessonItem';

export class LessonContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            lessons: []
        }
    }
    componentWillMount() {
        this.setState({loading: true});
        axios.get(`https://jr-001-pawpatrol-course-api.herokuapp.com/api/lessons?filter={"include":["teacher","course"]}`)
            .then((response) => this.setState({
                loading: false,
                lessons: response.data
            })).catch(error => {
                this.setState({loading: false});
                throw(error);
            });
    }
    render() {
        const lessons = this.state.lessons.map((aLesson, index) => {
            return (
                <div className="col-sm-4 col-md-3" key={index}>
                    <LessonItem {...this.props} lesson={aLesson} />
                </div>
            );
        });
        return (
        <div>
            <div className="container">
                <div className="row">
                    <Link className="btn btn-primary" to="/lessons/create">Add a new Lesson</Link>
                    <Spinner loading={this.state.loading} />
                </div>
                <div className="row">
                    {lessons}
                </div>
            </div>
            
        </div>
        );
    }
}