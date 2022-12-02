import React, { useState } from "react";
import "./list.css";




const List = () => {


	const ListItem = (props) => {
		const [isExpanded, setIsExpanded] = useState(false);

		const front = props.flashcard.firstPage;
		const back = props.flashcard.secondPage;

		const category = props.flashcard.category;

		return (
			<React.Fragment>
				<div className="list-element" onClick={(event) => (event.detail == 2 ? setIsExpanded(!isExpanded) : null)}>
					Frontside: {front} Backside: {back}
					{isExpanded && (
						<div className="expanded-view">
							Category: {category}
							<button onClick={() => deleteCard(props.index)}>Remove Card</button>
						</div>
					)}
				</div>
			</React.Fragment>
		);
	};


	const flashcardsExist = localStorage.length > 0 && "flashcards" in localStorage ? true : false;

    const cardList = flashcardsExist ? JSON.parse(localStorage.getItem("flashcards")) : null

    let listCard = null;
    if (cardList !== null) {
		listCard = cardList.map((flashcard, index) => <ListItem key={index} flashcard={flashcard} index={index} />);
	}

	const [cardsCount, setCardsCount] = flashcardsExist ? useState(JSON.parse(localStorage.getItem("flashcards")).length) : useState(0);
    const [cardsRender, setCardsRender] = listCard ? useState(listCard) : useState("")
    const [filtered, setFiltered] = useState(false); // are we showing filtered cards or all?

    const showFilteredCards = (query) => {
        
        const filterCards = (card) => {
            if (card.firstPage.toLowerCase().includes(query.toLowerCase()) || card.secondPage.toLowerCase().includes(query.toLowerCase())) {
                return true;
            }
            return false;
        };

        if (query == "") {   // default
            setFiltered(false);
            setCardsRender(listCard);
            return
        }
        
        const filteredCards = cardList.filter(filterCards) // filter out cards that do not contain query
        
        console.log(filteredCards)
        console.log(filteredCards.length < cardList.length)
        if (filteredCards.length < cardList.length) {
            let indices = [];
            for (let i = 0; i < filteredCards.length; i++) {
                indices.push(cardList.indexOf(filteredCards[i]))
            }
            
            let remainingCards = filteredCards.map((flashcard, index) => <ListItem key={indices[index]} flashcard={flashcard} index={indices[index]} />);
            console.log("REAL INDEX:", indices[0])
            setCardsRender(remainingCards)
            setFiltered(true)
        } else {
            setFiltered(false);
            setCardsRender(listCard)
        }
    }



	const deleteCard = (index) => {
		cardList.splice(index, 1);

		localStorage.setItem("flashcards", JSON.stringify(cardList)); //update array

		setCardsCount(cardsCount - 1);
	};





	return (
		<div className="list-container">
			<form>
				<label>
					Search:
					<input type="text" onChange={(event) =>  showFilteredCards(event.target.value)}/>
				</label>
			</form>
			<h1>Total cards: {cardsCount}</h1>
            {cardsRender}
			{/* {filtered ? cardsRender : cardsRender} */}
		</div>
	);
}; 

export default List;
