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
            .then(response => this.props.history.push('/courses'))
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div className="container">
                <h2>{this.props.detail.name}</h2>
                <p>{this.props.detail.description}</p>
                <img src={this.props.detail.image} />

                <div>
                <Link className="btn btn-primary" to={{
                    pathname: '/courses/edit',
                    state: { detail: this.props.detail }
                }}>
                    Edit
                </Link>
                <button className="btn btn-danger" onClick={this.onDelete}>
                    Delete
                </button>
                </div>
            </div>
        );
    }
};