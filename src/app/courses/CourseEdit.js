import React from 'react';
import axios from 'axios';

export default class CourseEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props.detail};
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onInputChange(event) {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        })
    }
    onSubmit(event) {
        event.preventDefault();
        axios.put(`https://jr-001-pawpatrol-course-api.herokuapp.com/api/courses/${this.state.id}`, {
            name: this.state.name,
            description: this.state.description
        }).then(({data}) => {
            this.props.history.push({
                pathname: `/course/detail`,
                state: { detail: data }
            });
        }).catch(err => console.log(err))
    }
    render() {
        return (
            <form onSubmit={this.onSubmit} className="container">
                <div className="form-group">
                    <label>Course Name</label>
                    <input type="text" className="form-control" 
                        value={this.state.name} 
                        name="name" 
                        onChange={this.onInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Course Description</label>
                    <textarea type="text" className="form-control" 
                        name="description" 
                        value={this.state.description} 
                        onChange={this.onInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    };
}