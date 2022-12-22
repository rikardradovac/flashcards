import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import Deck from "./deck";
import "./main.css";


const MainWindow = () => {
	// we keep the chosen key in store.activeKey

	const [add, setAdd] = useState(false);
	const [decks, setDecks] = store.has("decks") ? useState(store.get("decks")) : useState([]);
	const [newDeck, setNewDeck] = useState("");

	function handleSubmit() {
		let temp = decks;
		temp.push(newDeck);

		setNewDeck("");
		setAdd(!add);

		setDecks(temp);

		store.set("decks", temp);
	}

	function handleDelete(index) {
		let temp = [...decks];

    let deckName = temp[index]

		temp.splice(index, 1);
    
		
		setDecks(temp);
		store.set("decks", temp)
    store.delete(deckName) // deleting the related cards
	}


  
	return (
		<div className="main-container">
			<h1 id="title">Card decks</h1>

			<div className="flex-container">
				{decks.map((name, index) => (
					<div key={index} className="deck-box">
						<MdDeleteForever className="delete-logo" size={18} onClick={() => handleDelete(index)} />
						<NavLink to={"/flashcards"} className="link-main" onClick={() => store.set("activeKey", name)}>
							<Deck name={name} />
						</NavLink>
					</div>
				))}

				<Deck addDeck={true} onClick={() => setAdd(!add)} />

				{add && (
					<div className="add-container">
						<div className="add-content">
							<h1 onClick={() => setAdd(!add)} className="exit-button">
								<MdOutlineClose className="exit-logo" />
							</h1>
							<div className="add-box">
								<label htmlFor="deck-id">New deck name:</label>
								<input id="deck-id" type="text" name="deck-id" value={newDeck} onChange={(event) => setNewDeck(event.target.value)} />
								<button className="submit-button" onClick={() => handleSubmit()}>
									Add deck
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default MainWindow;
