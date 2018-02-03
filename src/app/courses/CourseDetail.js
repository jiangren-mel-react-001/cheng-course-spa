import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

export default class CourseDetail extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }
    onDelete(event) {
        axios.delete(`https://jr-001-pawpatrol-course-api.herokuapp.com/api/courses/${this.props.detail.id}`)
            .then(response => this.props.history.push('/course'))
            .catch(err => console.log(err));
    }
    render() {
        return(
            <div className="container">
                hi
            </div>
        );
    }
};