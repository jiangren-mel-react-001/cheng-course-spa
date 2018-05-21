import React from 'react';
import axios from 'axios';

export default class CourseEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props.location.state.detail};
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
            description: this.state.description,
            image: this.state.image
        }).then(({data}) => {
            this.props.history.push({
                pathname: `/courses/detail`,
                state: { detail: data }
            });
        }).catch(err => console.log(err))
    }
    render() {
        return (
            <form onSubmit={this.onSubmit} className="container">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" 
                        value={this.state.name} 
                        name="name" 
                        onChange={this.onInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>skills</label>
                    <textarea type="text" className="form-control" 
                        name="description" 
                        value={this.state.description} 
                        onChange={this.onInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>image</label>
                    <textarea type="text" className="form-control" 
                        name="image" 
                        value={this.state.image} 
                        onChange={this.onInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    };
}