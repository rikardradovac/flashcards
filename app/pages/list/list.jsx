import React, { useState, useRef } from "react";
import "./list.css";

store.log()




function compareObjects(obj1, obj2) {
    // first, check that the objects have the same number of keys
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false;
    }
  
    // then, iterate over the keys in obj1 and compare the values
    // in obj1 and obj2 for each key
    for (const key of Object.keys(obj1)) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  
    // if we haven't returned false yet, the objects must be equal
    return true;
  }


const List = () => {

	const ListItem = (props) => {
		const [isExpanded, setIsExpanded] = useState(false);

		const front = props.flashcard.firstPage;
		const back = props.flashcard.secondPage;

		const category = props.flashcard.category;

		return (
				<div className="list-element" onClick={(event) => (event.detail == 2 ? setIsExpanded(!isExpanded) : null)}>
					Frontside: {front} Backside: {back}
					{isExpanded && (
						<div className="expanded-view">
							Category: {category}
							<button onClick={() => deleteCard(props.index)}>Remove Card</button>
						</div>
					)}
				</div>

		);
	};
    // testing something more

    const KEY = store.get("activeKey")
    const COUNTERKEY = "counter"

	const flashcardsExist = store.has(KEY)

    const cardList = flashcardsExist ? store.get(KEY) : null

	const [cardsCount, setCardsCount] = flashcardsExist ? useState(store.get(KEY).length) : useState(0);
    const [cardsRender, setCards] = cardList ? useState(cardList) : useState("")
    const cardListRef = useRef(cardList) // ref for correctly handling the cards
    let filtered = store.has("filtered") ? useRef(store.get("filtered").current) : useRef(false);  // variable for keeping the filtered state
    
    const showFilteredCards = (query) => {
        
        const filterCards = (card) => {
            if (card.firstPage.toLowerCase().includes(query.toLowerCase()) || card.secondPage.toLowerCase().includes(query.toLowerCase())) {
                return true;
            }
            return false;
        };

        if (query == "") {   // default
            setCards(cardList);
            filtered.current = false;
            store.set("filteredState", filtered)
            return
        }
        
        const filteredCards = cardList.filter(filterCards) // filter out cards that do not contain query
        if (filteredCards.length < cardList.length) {
            let indices = [];
            for (let i = 0; i < filteredCards.length; i++) {
                indices.push(cardList.indexOf(filteredCards[i]))
            }
            
            let remainingCards = filteredCards.map((flashcard, index) => <ListItem key={indices[index]} flashcard={flashcard} index={indices[index]} />);


            setCards(remainingCards)
            cardListRef.current = remainingCards // updating the ref
            filtered.current = true;
            store.set("filteredState", filtered)
        } else {
            setCards(cardList)
            filtered.current = false;
            store.set("filteredState", filtered)
        }
        
    }   

    
	const deleteCard = (index) => {
        // deleting card logic:
        // we get an index from the TOTAL list, we need to map it to our filtered
        //we pop the filtered index and update the current rendered cards
        
        let tempArr = [...cardListRef.current]  // this array keeps track of the cards to render
        
        if (filtered.current) {
            // mapping for the correct index
            const filteredIndex = tempArr.map((object) => object.props.flashcard).indexOf(cardsRender[index])

            tempArr.splice(filteredIndex, 1) // remove selected card

            
            cardList.splice(index, 1)  // remove the selected card from the whole array
            store.set(KEY, cardList); //update array
            
            let matchingIndices = cardList.map((obj, index) => tempArr.some(obj2 => compareObjects(obj, obj2.props.flashcard)) ? index : -1).filter(index => index !== -1);
            
            // check if we have to many matches (equal objects)
            if (tempArr.length !== matchingIndices.length) {
                matchingIndices = matchingIndices.slice(0, tempArr.length)
            } 


            // create new cards to render, which correct keys (indices)
            let remainingCards;
            if (matchingIndices.length === 1 && matchingIndices[0] === -1) {
                remainingCards = null
                // means we only have one card left in the array
            } else if (matchingIndices.length === 1) {  
                remainingCards = <ListItem key={matchingIndices[0]} flashcard={tempArr[0].props.flashcard} index={matchingIndices[0]} />;
                remainingCards = [remainingCards.props.flashcard] // i dont like javascript
                
            } else if (matchingIndices.length > 1) {
                remainingCards = tempArr.map((object, ind) => <ListItem key={matchingIndices[ind]} flashcard={object.props.flashcard} index={matchingIndices[ind]} />);
                remainingCards = remainingCards.map(object => object.props.flashcard)

            } else if (matchingIndices.length === 0) {
                remainingCards = null
            }
            setCards(remainingCards)
            cardListRef.current = [...tempArr]
            
        } else {
            
            cardList.splice(index, 1)  // remove the selected card from the whole array
            store.set(KEY, cardList); //update array
            setCards(cardList)
        }
        if (store.has(COUNTERKEY)) {
            let count = store.get(COUNTERKEY);
            count = count !== 0 ?  count - 1 : 0
            store.set(COUNTERKEY, count);

            } 
		setCardsCount(cardsCount - 1);
	};



    
	return (
		<div className="list-container">
			<form>
				<label>
					Search:
					<input type="text" onChange={(event) => showFilteredCards(event.target.value)}/>
				</label>
			</form>
			<h1>Total cards in the current Deck: {cardsCount}</h1>
            { cardsRender ? 
            (React.isValidElement(cardsRender[0]) ? cardsRender  : cardsRender.map((flashcard, index) => <ListItem key={index} flashcard={flashcard} index={index}/>)) 
                : null
            }
            
		</div>
	);
}; 

export default List;
