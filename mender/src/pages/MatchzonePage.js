import React from "react";
import Cards from "../components/Cards";
import BotNavBar from "../components/BotNavBar";
import TopNavBar from "../components/TopNavBar";
import './MatchzonePage.css'

function MatchzonePage(props) {
    console.log(props);
    return (
        <div className="overflow-x-hidden">
            {/* <TopNavBar /> */}
            <Cards email={props.email}/>
            {/* <BotNavBar /> */}
        </div>
    );
}

export default MatchzonePage;