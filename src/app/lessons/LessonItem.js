import React from 'react';

export const LessonItem = (props) => {
    const {lesson} = props;
    return (
        <div>
            <h2>{lesson.name}</h2>
            <p>{lesson.description}</p>
            <h4>Teacher</h4>
            <p>{lesson.teacher.name}</p>
            <h4>Content</h4>
            <p>{lesson.course.name}</p>
        </div>
    );
}
