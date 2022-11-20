import React, { useState } from "react";
import "./card.css";



const flashCards = JSON.parse(localStorage.getItem("flashcards"));


const Card = ({card}) => {
    const [flipped, setSide] = useState(false);

    const flipCard = (event) => {
        setSide(!flipped)
    }
    return (
        <div className="card-container" onClick={(event) => flipCard(event)}>
            <h1>{flipped ? card.secondPage : card.firstPage}</h1>
        </div>
    )
}


export default Card