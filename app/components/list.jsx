import React from "react";


const List = () => {
    
    let listCard = null

    if (localStorage.length > 0) {
        const cardList = JSON.parse(localStorage.getItem("flashcards"))
        listCard = cardList.map((flashcard, index) => 
        <li key={index} onClick={() => console.log("clicked")}>{flashcard.firstPage} {flashcard.secondPage}</li>
    )
    }
    
    
    


    return (
        <div>
            <ul>
                {listCard}
            </ul>
        </div>
    )
}

export default List