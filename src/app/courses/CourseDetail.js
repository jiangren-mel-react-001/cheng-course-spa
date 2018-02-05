import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

export default class CourseDetail extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }
    onDelete(event) {
        const {detail} = this.props.location.state;
        axios.delete(`https://jr-001-pawpatrol-course-api.herokuapp.com/api/courses/${detail.id}`)
            .then(response => this.props.history.push('/courses'))
            .catch(err => console.log(err));
    }
    render() {
        const {detail} = this.props.location.state;
        return (
            <div className="container">
                <h2>{detail.name}</h2>
                <p>{detail.description}</p>
                <img src={detail.image} alt="please check the resource" className="img-responsive" />

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