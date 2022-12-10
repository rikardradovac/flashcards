import React, { useState } from "react";
import "./cardcontainer.css";
import AddCard from "./add";
import "./card.css";
import Categories from "../../components/categories";
import fractionUnicode from "fraction-unicode";
import ReactCardFlip from "react-card-flip";

const CardContainer = () => {
	const storageExists = localStorage.length > 0;
	const flashCardsExist = storageExists ? "flashcards" in localStorage && JSON.parse(localStorage.getItem("flashcards")).length > 0 : false; // if we have storage, we check if flashcards exists
	const counterExists = storageExists ? "counter" in localStorage : false; // if we have storage, we check if counter exists

	const flashCards = flashCardsExist ? JSON.parse(localStorage.getItem("flashcards")) : null;

	const [addCard, setAddCard] = useState(false);
	const [openCategory, setOpenCategory] = useState(false);
	const [count, SetCounter] = counterExists ? useState(parseInt(localStorage.getItem("counter"))) : useState("");

	const [flipped, setSide] = useState(false);

	if (flashCardsExist && count >= flashCards.length) {
		SetCounter(0); // Stops index going out of bounds
	}

	
	const updateCounter = (direction) => {
		var savedCount = counterExists ? parseInt(localStorage.getItem("counter")) : 0;

		if (direction === "back") {
			savedCount += -1;
			savedCount = savedCount === -1 ? flashCards.length - 1 : savedCount;
		} else {
			savedCount += 1;
		}
		savedCount = savedCount % flashCards.length === 0 ? 0 : savedCount;
		localStorage.setItem("counter", savedCount.toString());

		SetCounter(savedCount);

		flipped ? setSide(!flipped) : null; // always facing the first side
	};

	const nextCardClick = (event) => {
		if (!flashCardsExist) {
			SetCounter(0);
			return;
		}
		if (flashCards.length === 1) {
			SetCounter(0);
			localStorage.setItem("counter", JSON.stringify(0));
			return;
		}

		if (event === "back") {
			updateCounter(event);
		} else if (event === "front") {
			updateCounter("front");
		}

		if (typeof event !== "undefined") {
			if (event.key !== " ") {
				return;
			}
			return;
		}

		var savedCount = counterExists ? parseInt(localStorage.getItem("counter")) : 0;
		savedCount += 1;

		savedCount = savedCount % flashCards.length == 0 ? 0 : savedCount;
		localStorage.setItem("counter", savedCount.toString());

		SetCounter(savedCount);

		flipped ? setSide(!flipped) : null; // always facing the first side
	};

	const setCategory = () => {
		setOpenCategory(!openCategory);
	};

	const handleCategories = (category) => {
		flashCards[count].category = category;
		localStorage.setItem("flashcards", JSON.stringify(flashCards));
		setOpenCategory(!openCategory);
	};


	const CardSide = (props) => {
		return (
			<div className="card-container" onClick={() => setSide(!flipped)}>
				<div className="card-content">
					<h1>{props.side}</h1>
					<h1 className="count">{props.count}</h1>
				</div>
			</div>
		);
	};
	
	return (
		<div className="cardview-container">
			<h1>Flash card view</h1>
			<button onClick={() => setAddCard(true)}> Add items! </button>
			<button onClick={() => nextCardClick("front")} className="add-button">
				{" "}
				next card
			</button>
			<button onClick={() => nextCardClick("back")}>Previous card</button>
			<button className="category-button" onClick={() => setCategory()}>
				Set category
			</button>
			<Categories trigger={openCategory} setTrigger={setOpenCategory} onClickHandler={handleCategories} />

			{count !== "" && flashCardsExist ? (
				<ReactCardFlip isFlipped={flipped} flipDirection="vertical">
					<CardSide side={flashCards[count].firstPage} count={fractionUnicode(count + 1, flashCards.length)} />
					<CardSide side={flashCards[count].secondPage} count={fractionUnicode(count + 1, flashCards.length)} />
				</ReactCardFlip>
			) : null}
			<AddCard trigger={addCard} setTrigger={setAddCard}>
				{" "}
				<h3> Add</h3>{" "}
			</AddCard>
		</div>
	);
};

export default CardContainer;
