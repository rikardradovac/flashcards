import React, { useState } from 'react';


const AddCardObject = (front, back) => {
    if (localStorage.length > 0) {
        var cards = JSON.parse(localStorage.getItem("flashcards"));

    } else {
        var cards = []
    };
    
    let newCard = {
        firstPage: front,
        secondPage: back,
    }

    cards.push(newCard)
    localStorage.setItem("flashcards", JSON.stringify(cards))

}


const AddCard = (props) => {
    const [firstSide, setFirstSide] = useState("")
    const [secondSide, setsecondSide] = useState("")

    
    const handleSubmit = (event) => {
        event.preventDefault;
        AddCardObject(firstSide, secondSide)
        setFirstSide("")
        setsecondSide("")
        props.setTrigger(false)



    }

    return props.trigger ? (
        <div className='add-card-popup'>
            <button className='close-button' onClick={() => props.setTrigger(false)}>Close</button>
            { props.children }
            <form onSubmit={handleSubmit} name="card-form">
                <label>
                    first side
                    <input type="text" value={firstSide} onChange={event => setFirstSide(event.target.value)}/>
                </label>
                <label>
                    second side
                    <input type="text" value={secondSide} onChange={event => setsecondSide(event.target.value)}/>
                </label>
                <input type="submit" />

                
            </form>
            <h1>{firstSide}</h1>
            <h1>{secondSide}</h1>
        </div>
    ): null
};

export default AddCard