import React, { useState } from "react";
import "./list.css"


const List = () => {
    const flashcardsExist = (localStorage.length > 0 && "flashcards" in localStorage) ? true : false;
    

    const [cardsCount, setCardsCount] = flashcardsExist ? useState(JSON.parse(localStorage.getItem("flashcards")).length) : useState(0);


    const ListItem = (props) => {
        const [isExpanded, setIsExpanded] = useState(false)

        const front = props.flashcard.firstPage
        const back = props.flashcard.secondPage

        const category = props.flashcard.category

        return (
           <React.Fragment> 
            <div className="list-element" onClick={() => setIsExpanded(!isExpanded)}>
                Frontside: {front} Backside: {back}  
                
                {isExpanded && (
                    <div className="expanded-view">Category: {category}
                    <button onClick={() => deleteCard(props.index)}>Remove Card</button>
                    </div>
                )}
            </div>
            </React.Fragment>
        )
    }
    
    const deleteCard = (index) => {
        cardList.splice(index, 1)

        localStorage.setItem("flashcards", JSON.stringify(cardList)) //update array

        setCardsCount(cardsCount - 1)

    }


    let listCard = null
    

    if (localStorage.length > 0) {
        var cardList = JSON.parse(localStorage.getItem("flashcards"))
        listCard = cardList.map((flashcard, index) => <ListItem key={index} flashcard={flashcard} index={index}/>)

        // <li key={index} className="card-element" onClick={() => renderCardInfo(flashcard)}>
        //     {flashcard.firstPage} {flashcard.secondPage} 
        //     <button onClick={() => deleteCard()} className="delete-card-button">Remove card</button>
        // </li>
    }
    


    return (
        <div className="list-container">
            <h1>Total cards: {cardsCount}</h1>
                {listCard}
            
        </div>
    )
}

export default List