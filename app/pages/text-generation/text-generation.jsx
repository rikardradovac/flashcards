import React, { useState } from "react";

//"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";

const TextGeneration = () => {

    const [prompt, setPrompt] = useState("")
    const [answer, setAnswer] = useState("")
	const [loading, setLoading] = useState(false)


    const handlePrompt = (event) => {
		
		let APIKEY = store.get("openai-apikey")
		
		if (typeof(APIKEY) === "undefined") {
			alert("You need to set an API key from openai under the options page!")
			setPrompt("")
			return
		}
		
		setLoading(true)
		event.preventDefault;

		// creating a post request to openAI
		const xhr = new XMLHttpRequest();
		let response;
		xhr.open('POST', 'https://api.openai.com/v1/completions');
		
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.setRequestHeader('Authorization', `Bearer ${APIKEY}`);
		xhr.onload = () => {
			response = JSON.parse(xhr.responseText);
			try {
			setAnswer(response.choices[0].text)  // selecting the first answer
			setLoading(false)
			} catch (error) {
				alert(response.error.message)
				setLoading(false)
			}
		};


		xhr.send(JSON.stringify({
			model: "text-davinci-003",
			prompt: "Q:" + prompt + "\nA:",
			temperature: 0,
			max_tokens: 100,
			top_p: 1.0,
			frequency_penalty: 0.0,
			presence_penalty: 0.0,
		}));

	}
	

    return ( loading ? (
		<div>
			<h1>temporary loading page :))</h1>
		</div>
	) 
		:
		
        <div className="generation-container">
			<h1>This is an AI generation station where you can ask a question and get an answer!</h1>
            <h3>Prompt: {prompt}</h3>
            <h3>Answer: {answer}</h3>
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