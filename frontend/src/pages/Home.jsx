import { React, useState } from "react";
import Header from "../components/Header";
import Pitch from "../components/Pitch";
import Footer from "../components/Footer";

function Page() {

    return (
        <div>
            <Header />
            <Pitch />
            <Footer />
        </div>
    );
}
  
export default Page;