import React from "react";

const Options = () => {

    return (
        <div className="options-container">
            <button onClick={() => store.delete("categories")}>Reset all categories</button>
            <button onClick={() => store.delete("decks")}>Reset all decks</button>
            <button onClick={() => store.clear()}>Reset ALL</button>
        </div>
    )
}

export default Options