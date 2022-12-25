import React, { useState } from "react";
import "./add.css";

const APIKEY = "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";
//APIIIII
// const xhr = new XMLHttpRequest();
// xhr.open('POST', 'https://api.openai.com/v1/completions');
// xhr.setRequestHeader('Content-Type', 'application/json');
// xhr.setRequestHeader('Authorization', `Bearer ${APIKEY}`);
// xhr.onload = () => {
// console.log(xhr.responseText);
// };
// xhr.send(JSON.stringify({
// 	model: "text-davinci-003",
// 	prompt: "What are 5 key points I should know when studying Ancient Rome?",
// 	temperature: 0.3,
// 	max_tokens: 150,
// 	top_p: 1.0,
// 	frequency_penalty: 0.0,
// 	presence_penalty: 0.0,
// }));

const AddCardObject = (front, back, firstPageImage, secondPageImage) => {

	if (!store.has("decks")) {
		alert("Please create a deck before you add a card!")
		return
	}
	

	const KEY = store.get("activeKey")
	const flashcardsExist = store.has(KEY);

	const flashCards = flashcardsExist ? store.get(KEY) : [];

	let newCard = {
		firstPage: front,
		secondPage: back,
		category: null,
		firstPageImage: firstPageImage,
		secondPageImage: secondPageImage,
	};

	flashCards.push(newCard);
	store.set(KEY, flashCards);
};

const AddCard = (props) => {
	const [firstSide, setFirstSide] = useState("");
	const [secondSide, setSecondSide] = useState("");

	const [firstImageFile, setFirstImageFile] = useState(null);
	const [secondImageFile, setSecondImageFile] = useState(null);

	const handleSubmit = (event) => {
		event.preventDefault;
		AddCardObject(firstSide, secondSide, firstImageFile, secondImageFile);
		setFirstSide("");
		setSecondSide("");
		setFirstImageFile(null);
		setSecondImageFile(null);
		props.setTrigger(false);
	};

	const handleImage = (event, type) => {
		let inputImage = event.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(inputImage);

		// storing image specs to localstorage

		reader.onload = () => {
			if (type === "front") {
				setFirstImageFile(String(reader.result));
			} else if (type === "back") {
				setSecondImageFile(String(reader.result));
			}
		};
	};

	return props.trigger ? (
		<div className="add-card-popup">
			<div className="add-card-content">
				<button className="close-button" onClick={() => props.setTrigger(false)}>
					Close
				</button>
				{props.children}
				<form onSubmit={handleSubmit}>
					<div className="card-form">
						<label htmlFor="front">
							<h1>Front</h1>
						</label>
						<textarea name="front" id="front" cols="30" rows="10" value={firstSide} onChange={(event) => setFirstSide(event.target.value)}></textarea>

						<label htmlFor="image-front">
							<h1>Front Image</h1>
						</label>
						<input type="file" accept="image/png, image/jpeg" onChange={(event) => handleImage(event, "front")} id="image-front" />

						<label htmlFor="back">
							{" "}
							<h1>Back</h1>
						</label>
						<textarea name="front" id="front" cols="30" rows="10" value={secondSide} onChange={(event) => setSecondSide(event.target.value)}></textarea>

						<label htmlFor="image-back">
							{" "}
							<h1>Back Image</h1>
						</label>
						<input type="file" accept="image/png, image/jpeg" onChange={(event) => handleImage(event, "back")} id="image-back" />
					</div>
					<input type="submit" />
				</form>
			</div>
		</div>
	) : null;
};

export default AddCard;
