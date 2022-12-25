import React, { useState } from "react";
import "./cardcontainer.css";
import AddCard from "./add";
import "./card.css";
import Categories from "../../components/categories";
import ReactCardFlip from "react-card-flip";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa"


// dataURLtoFile is a helper function that converts a data URL to a File object
function dataURLtoFile(dataurl, filename) {
	const arr = dataurl.split(",");
	const mime = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: mime });
}


const DropDownDecks = () => {};

const CardContainer = () => {
	// const KEY = "flashcards";
	let KEY = store.get("activeKey"); // get the current deck

	if (typeof KEY === "undefined") {
		// if we start without selecting activeKey, we use the first deck
		if (store.has("decks")) {
			KEY = store.get("decks")[0];
			store.set("activeKey", KEY);
			console.log("keeey", KEY)

		} 
	}

	const COUNTERKEY = "counter";

	const flashCardsExist = store.has(KEY);
	const flashCards = flashCardsExist ? store.get(KEY) : null;
	const flashCardsIsNotEmpty = flashCardsExist ? flashCards.length > 0 : false;
	const counterExists = store.has(COUNTERKEY);

	const [addCard, setAddCard] = useState(false);
	const [openCategory, setOpenCategory] = useState(false);
	const [count, SetCounter] = counterExists ? useState(store.get(COUNTERKEY)) : useState("");

	const [flipped, setSide] = useState(false);

	// checking if images exist
	const firstPageImage = flashCardsExist && typeof count === "number" && flashCardsIsNotEmpty ? flashCards[count].firstPageImage : null;
	const secondPageImage = flashCardsExist && typeof count === "number" && flashCardsIsNotEmpty ? flashCards[count].secondPageImage : null;

	const updateCounter = (direction) => {
		var savedCount = counterExists ? store.get(COUNTERKEY) : 0;

		if (direction === "back") {
			savedCount += -1;
			savedCount = savedCount === -1 ? flashCards.length - 1 : savedCount;
		} else {
			savedCount += 1;
		}
		savedCount = savedCount % flashCards.length;
		store.set(COUNTERKEY, savedCount);

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
			store.set(COUNTERKEY, 0);
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

		var savedCount = counterExists ? store.get(COUNTERKEY, savedCount) : 0;
		savedCount += 1;

		savedCount = savedCount % flashCards.length == 0 ? 0 : savedCount;
		store.set(COUNTERKEY, savedCount);

		SetCounter(savedCount);

		flipped ? setSide(!flipped) : null; // always facing the first side
	};

	const setCategory = () => {
		setOpenCategory(!openCategory);
	};

	const handleCloseCategories = () => {
		setOpenCategory(!openCategory)
	}

	const handleCategories = (category) => {
		flashCards[count].category = category;
		store.set(KEY, flashCards);
		setOpenCategory(!openCategory);
	};

	const CardSide = (props) => {
		const image = props.pageImage ? dataURLtoFile(props.pageImage, "pic") : null;

		return props.pageImage ? (
			<div className="card-container" onClick={() => setSide(!flipped)}>
				<h1 className="count">{props.count}</h1>
				<h1 className="category-label">Category: {props.category}</h1>
				<div className="card-content-image">
					<p className="text-label">{props.side}</p>
					<img className="image-box" src={URL.createObjectURL(image)} key={image} />
				</div>
			</div>
		) : (
			<div className="card-container" onClick={() => setSide(!flipped)}>
				<h1 className="count">{props.count}</h1>
				<h1 className="category-label">Category: {props.category}</h1>
				<div className="card-content">
					<p>{props.side}</p>
				</div>
			</div>
		);
	};

	return (
		<div className="cardview-container">
			<h1>Current Deck: {KEY}</h1>
			<div className="options-container">
			
			<button onClick={() => setAddCard(true)} id="add-button">Add a new card</button>
			<div onClick={() => nextCardClick("front")} id="next-button"><FaLongArrowAltRight size={70}/></div>
			<div onClick={() => nextCardClick("back")} id="prev-button"><FaLongArrowAltLeft size={70}/></div>
			<button id="category-button" onClick={() => setCategory()}>
				Set category
			</button>
			<Categories trigger={openCategory} setTrigger={setOpenCategory} onClickHandler={handleCategories} onClickClose={handleCloseCategories}/>
			</div>
			

			{typeof count === "number" && flashCardsExist && flashCardsIsNotEmpty ? (
				<ReactCardFlip isFlipped={flipped} flipDirection="vertical">
					<CardSide side={flashCards[count].firstPage} count={String(count + 1) + "/" + String(flashCards.length)} pageImage={firstPageImage} category={flashCards[count].category}/>
					<CardSide side={flashCards[count].secondPage} count={String(count + 1) + "/" + String(flashCards.length)} pageImage={secondPageImage} category={flashCards[count].category}/>
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
