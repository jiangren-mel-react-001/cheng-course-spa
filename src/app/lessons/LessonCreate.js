import React from 'react';
import axios from 'axios';

export class LessonCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            teacherId: '5a755026d388230f209184be',
            courseId: '',
            teachers: [],
            courses: []
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillMount() {
        axios.get(`https://jr-001-pawpatrol-course-api.herokuapp.com/api/courses`).then(({data}) => {
            this.setState({
                courses: data
            });
        }).catch(err => console.log(err))
    }
    onInputChange(event) {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        })
    }
    onSubmit(event) {
        event.preventDefault();
        axios.post(`https://jr-001-pawpatrol-course-api.herokuapp.com/api/lessons`, {
            name: this.state.name,
            description: this.state.description,
            courseId: this.state.courseId,
            teacherId: this.state.teacherId
        }).then(({data}) => {
            this.props.history.push({
                pathname: `/lessons`
            });
        }).catch(err => console.log(err))
    }
    render() {
        const courseList = this.state.courses.map((aCourse, index) => (
            <option key={index} value={aCourse.id}>{aCourse.name}</option>
        ))
        return (
            <form onSubmit={this.onSubmit} className="container">
                <div className="form-group">
                    <label>Lesson Name</label>
                    <input type="text" className="form-control" 
                        value={this.state.name} 
                        name="name" 
                        onChange={this.onInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Lesson Description</label>
                    <input type="text" className="form-control" 
                        name="description" 
                        value={this.state.description} 
                        onChange={this.onInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Course</label>
                    <select name="courseId" value={this.state.courseId} onChange={this.onInputChange}>
                      {courseList}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    };
}