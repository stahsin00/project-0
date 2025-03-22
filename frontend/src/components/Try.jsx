import { React, useState } from "react";

function Try() {
    const [txt, setTxt] = useState("");

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

            <textarea
                type="text"
                id="txt"
                name="txt"
                placeholder="Enter your ideas here..."
                value={txt}
                onChange={(e) => setName(e.target.value)}
                className="text-light-cream p-2 mb-15">
            </textarea>
        </div>
    );
}

export default Try;