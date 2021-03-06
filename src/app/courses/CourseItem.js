import React from 'react';

export default (props) => (
    <div className="thumbnail">
        <img  src={props.item.image} alt="member"  width="300" height="200" />
        <h2>{props.item.name}</h2>
        <p>{props.item.description}</p>
        <button className="btn btn-primary" onClick={() => props.onDetail(props.item)}>
            Detail
        </button>
    </div>
);
