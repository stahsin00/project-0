import React from "react";

function Header() {
  return (
    <>
      <div className="popUp text-center mt-40 mb-50">
        <div className="the-top bg-dusty-blue">
          {/* <div className="tabBut"/>
          <div className="tabBut"/>
          <div className="tabBut"/> */}
          <ul>
            <li className="tabBut"/>
            <li className="tabBut"/>
            <li className="tabBut"/>
          </ul>
        </div>
        <header className="text-teal">
          <h1 className="my-20">Welcome to PitchMint!</h1>
          <p className="mb-20">Fresh ideas, crisp presentations</p>
          {/* <p>Your minty fresh app for crafting perfect pitches.</p> */}
        </header>
      </div>
    </>
  )
}

export default Header;
