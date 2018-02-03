import React from 'react';

export default (props) => (
    <div>
        <h2>{props.item.name}</h2>
        <img src={props.item.image} />
        <p>{props.item.description}</p>
        <button className="btn btn-primary" onClick={() => props.onDetail(props.item)}>
            Detail
        </button>
    </div>
);
