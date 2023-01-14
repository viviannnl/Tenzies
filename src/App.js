import React from "react";
import Dice from "./components/Dice";
import "./style.css"

export default function App() {
    function allNewDice() {
        const diceArray = []
        for (let i = 0; i < 10; i++) {
            diceArray.push(Math.floor(Math.random() * 6 + 1))
        }
        return diceArray
    }
    
    const [dice, setDice] = React.useState(allNewDice())
    
    function rollDice() {
        setDice(allNewDice())
    }
    
   const diceElements = dice.map(item => <Dice value={item} />)
    
    return (
        <main>
            <div className="dice-container">
                {diceElements}
            </div>
            <button type="button" className="button" onClick={rollDice}>Roll</button>
        </main>
    )
}