import React, { useState } from "react";
import "./add.css";

// dataURLtoFille is a helper function that converts a data URL to a File object
function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

const AddCardObject = (front, back, firstPageImage) => {
    const flashcardsExist = localStorage.length > 0 && "flashcards" in localStorage ? true : false;

    const flashCards = flashcardsExist ? JSON.parse(localStorage.getItem("flashcards")) : [];

    let newCard = {
        firstPage: front,
        secondPage: back,
        category: null,
        firstPageImage: firstPageImage,
        secondPageImage: null,
    };
    
    console.log(newCard)
    flashCards.push(newCard);
    localStorage.setItem("flashcards", JSON.stringify(flashCards));
};

const AddCard = (props) => {
    const [firstSide, setFirstSide] = useState("");
    const [secondSide, setsecondSide] = useState("");


    const [firstImageFile, setFirstImageFile] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault;
        console.log("FIRST IM", firstImageFile)
        AddCardObject(firstSide, secondSide, firstImageFile);
        setFirstSide("");
        setsecondSide("");
        setFirstImageFile(null)
        props.setTrigger(false);
        

    };

    const handleImage = (event) => {
        
        let inputImage = event.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(inputImage);

        // storing image specs to localstorage
        reader.onload = () => {
            localStorage.setItem('file', reader.result);
            console.log("setting", reader.result)
            setFirstImageFile(String(reader.result));
          };
        

        

        const dataUrl = localStorage.getItem('file');
        const file = dataURLtoFile(dataUrl, inputImage.name);

        
        

    }


    return props.trigger ? (
        <div className="add-card-popup">
            <div className="add-card-content">
                <button className="close-button" onClick={() => props.setTrigger(false)}>
                    Close
                </button>
                {props.children}
                <form onSubmit={handleSubmit} name="card-form">
                    <label>
                        first side
                        <input type="text" value={firstSide} onChange={(event) => setFirstSide(event.target.value)} />
                    </label>
                    <label>
                        second side
                        <input type="text" value={secondSide} onChange={(event) => setsecondSide(event.target.value)} />
                    </label>
                    <label>
                        first side image
                        <input type="file" accept="image/png, image/jpeg" onChange={event => handleImage(event)} />
                        {/* <input type="file" value={imagePath} onChange={(event) => setImagepath(event.target.value)} /> */}
                    </label>
                    <input type="submit" />
                </form>
                <h1>{firstSide}</h1>
                <h1>{secondSide}</h1>
                {/* {imageFile && (
        <img src={URL.createObjectURL(imageFile)} />
      )} */}
                
                {/* {imagePath && <img src={URL.createObjectURL(imagePath)} />} */}
            </div>
        </div>
    ) : null;
};

export default AddCard;
