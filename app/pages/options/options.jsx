import React, { useState } from "react";

const Options = () => {

    const [key, setKey] = useState("")

    function handleSubmit() {
        store.set("openai-apikey", key)
        setKey("")
    }

    return (
        <div className="options-container">
            <div className="options">
            <button onClick={() => store.delete("categories")}>Reset all categories</button>
            <button onClick={() => store.delete("decks")}>Reset all decks</button>
            <button onClick={() => store.clear()}>Reset ALL</button>
            <form onSubmit={() => handleSubmit()}>
                <label htmlFor="key">Input API Key</label>
                <input type="text" name="key" id="key" value={key} onChange={(event) => setKey(event.target.value)}/>
                <input type="submit" />
            </form>
            </div>
        </div>
    )
}

export default Options