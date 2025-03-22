import { React, useState } from "react";

function Try() {
    const [txt, setTxt] = useState("");

    async function HandleSubmit(e) {
        e.preventDefault();

        // "gen" for "generate response"
        // const apiUrl = 'http://localhost:3000/api/generate';
        // fetch(apiUrl)
        // .then((res) => res.json())
        // .then((gen) => {
        //     setAppState({ loading: false, gen: gen.slice(0,4) });
        // });

        const response = await fetch(
        'http://localhost:3000/api/generate',
            {
              method: 'POST',
              body: JSON.stringify({ "topic": txt }),
              headers: {
                'Content-Type': 'application/json',
              },
            }
        );

        setTxt("");
        const result = await response.json();
        console.log(result);
    }

    return (
        <div className="popUp text-teal mb-25">
            <div className="the-top bg-dusty-blue">
                <ul>
                    <li className="tabBut"/>
                    <li className="tabBut"/>
                    <li className="tabBut"/>
                </ul>
            </div>
            <h2 className="mt-5 mb-10">Try It Now!!!</h2>

            <form action="" onSubmit={HandleSubmit}>
                <textarea
                    type="text"
                    id="txt"
                    name="txt"
                    placeholder="Enter your ideas here..."
                    value={txt}
                    onChange={(e) => setTxt(e.target.value)}
                    className="text-light-cream p-2 mb-5">
                </textarea>

                <br />

                <button
                type="submit"
                className="w-50 h-full bg-dusty-blue text-white rounded-lg px-4 py-2 mb-10"
                >Submit Pitch</button>
            </form>
        </div>
    );
}

export default Try;