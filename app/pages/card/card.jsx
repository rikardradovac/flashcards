import React from "react";
import "./card.css";




const Card = (props) => {
    return (
        <div className="card-container" onClick={props.onClick}>
            <div className="card-content">
                <h1>{props.setFlipped ? props.card.secondPage : props.card.firstPage}</h1>
                <h1 className="count">{props.count}</h1>
            </div>

        </div>
    );
};



export default Card