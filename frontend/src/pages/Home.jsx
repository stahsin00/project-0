import { React, useState } from "react";
import Header from "../components/Header";
import Scroll from "../components/Scroll";
import Features from "../components/Features";
import Pitch from "../components/Pitch";
import Footer from "../components/Footer";

function Page() {
    return (
        <div>
            <Header />
            <Scroll/>
            <Features />
            <Scroll/>
            <Pitch />
            <Footer />
        </div>
    );
}
  
export default Page;