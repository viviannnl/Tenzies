import React from "react";

export default function Dice(props) {
    const style = {
        backgroundColor: props.isHeld? "#59E391": "white",
    }

    return (
        <div 
            className="die" 
            style={style} 
            onClick={props.handleClick}
        >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}