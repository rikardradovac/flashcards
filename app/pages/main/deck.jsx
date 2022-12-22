import React, { useState } from "react";
import { GrAddCircle } from "react-icons/gr"
import "./deck.css"


const Deck = (props) => {
    const [deckName, setDeckName] = useState(props.name)
    // onClick={(event) => (event.detail == 2 ? setIsExpanded(!isExpanded) : null)}


    return props.addDeck ? (
        <div className="deck-container-add" onClick={props.onClick}>
            <GrAddCircle size={100}/>
        </div>
    ) : 
    (  
        <div className="deck-container" >
            <h1>{deckName}</h1>
        </div>
    )
};


export default Deck;