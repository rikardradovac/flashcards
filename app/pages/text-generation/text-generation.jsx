import React, { useState } from "react";

const APIKEY = "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";


const TextGeneration = () => {

    const [prompt, setPrompt] = useState("")
    const [answer, setAnswer] = useState("")


    const handlePrompt = (event) => {
		event.preventDefault;

		// creating a post request to openAI
		const xhr = new XMLHttpRequest();
		let response;
		xhr.open('POST', 'https://api.openai.com/v1/completions');
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.setRequestHeader('Authorization', `Bearer ${APIKEY}`);
		xhr.onload = () => {
			response = JSON.parse(xhr.responseText);
			setAnswer(response.choices[0].text)  // selecting the first answer
		};

		xhr.send(JSON.stringify({
			model: "text-davinci-003",
			prompt: "Q:" + prompt + "\nA:",
			temperature: 0,
			max_tokens: 60,
			top_p: 1.0,
			frequency_penalty: 0.0,
			presence_penalty: 0.0,
		}));	
	}

    return (
        <div className="generation-container">
            <h1>Prompt: {prompt}</h1>
            <h1>Answer: {answer}</h1>
            <form onSubmit={handlePrompt}>
					<label>
						Please enter prompt for generation:
						<input type="text" value={prompt} onChange={(event) => setPrompt(event.target.value)} />
					</label>
					<input type="submit" />
            </form>
        </div>
    )
}


export default TextGeneration