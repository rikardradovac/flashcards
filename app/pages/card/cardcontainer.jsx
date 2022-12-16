import React, { useState } from "react";
import "./cardcontainer.css";
import AddCard from "./add";
import "./card.css";
import Categories from "../../components/categories";
import fractionUnicode from "fraction-unicode";
import ReactCardFlip from "react-card-flip";

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

const KEY = "flashcards";
const COUNTERKEY = "counter";

const CardContainer = () => {
	const flashCardsExist = store.has(KEY);
	const flashCards = flashCardsExist ? store.get("flashcards") : null;
	const flashCardsIsNotEmpty = flashCardsExist ? flashCards.length > 0 : false;
	const counterExists = store.has(COUNTERKEY);

	const [addCard, setAddCard] = useState(false);
	const [openCategory, setOpenCategory] = useState(false);
	const [count, SetCounter] = counterExists ? useState(store.get(COUNTERKEY)) : useState("");

	const [flipped, setSide] = useState(false);

	// if (flashCardsExist && count >= flashCards.length) {
	// 	SetCounter(0); // Stops index going out of bounds
	// }

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

	const handleCategories = (category) => {
		flashCards[count].category = category;
		store.set(KEY, flashCards);
		setOpenCategory(!openCategory);
	};

	const CardSide = (props) => {
		// const dataUrl = localStorage.getItem('file');
		const image = props.pageImage ? dataURLtoFile(props.pageImage, "pic") : null;

		return props.pageImage ? (
			<div className="card-container" onClick={() => setSide(!flipped)}>
				<div className="card-content-image">
					<img className="image-box" src={URL.createObjectURL(image)} key={image}/>
					<h1 className="text-label">{props.side}</h1>
					<h1 className="count-image">{props.count}</h1>
					
				</div>
			</div>
		) : (
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

			{typeof count === "number" && flashCardsExist && flashCardsIsNotEmpty ? (
				<ReactCardFlip isFlipped={flipped} flipDirection="vertical">
					<CardSide side={flashCards[count].firstPage} count={String(count+1) + "/" + String(flashCards.length)} pageImage={firstPageImage} />
					<CardSide side={flashCards[count].secondPage} count={String(count+1) + "/" + String(flashCards.length)} pageImage={secondPageImage} />
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
