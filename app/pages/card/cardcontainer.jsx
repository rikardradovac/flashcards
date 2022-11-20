import React, { useState } from "react";
import "./cardcontainer.css";
import AddCard from "./add";
import Card from "./card.jsx";


const CardContainer = () => {
    
    const flashCards = JSON.parse(localStorage.getItem("flashcards"));
    const [addCard, setAddCard] = useState(false);
    const [count, SetCounter] = "counter" in localStorage ? useState(parseInt(localStorage.getItem("counter"))) : "";

    const nextCardClick = () => {
        var savedCount = "counter" in localStorage ? parseInt(localStorage.getItem("counter")) : 0;
        savedCount += 1;

        savedCount = savedCount % flashCards.length == 0 ? 0 : savedCount;
        localStorage.setItem("counter", savedCount.toString());

        SetCounter(savedCount);
    };

    return (
        <div className="card-view">
            <div>
                <h1>Flash card view</h1>
                <button onClick={() => setAddCard(true)}> Add items! </button>
                <button onClick={() => nextCardClick()} className="add-button"> next card</button>
            </div>

            <div>
                <h2>test!!</h2>
                {count !== "" ? <Card card={flashCards[count]} /> : null}
                <AddCard trigger={addCard} setTrigger={setAddCard}>
                    {" "}
                    <h3> Add</h3>{" "}
                </AddCard>
            </div>
        </div>
    );
};

export default CardContainer;
