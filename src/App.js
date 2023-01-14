import React from "react";
import Dice from "./components/Dice";
import "./style.css"
import { nanoid } from 'nanoid'

export default function App() {
    function allNewDice() {
        const diceArray = []
        for (let i = 0; i < 10; i++) {
            diceArray.push({
                value: Math.floor(Math.random() * 6 + 1),
                isHeld: false,
                id: nanoid()
            })
        }
        return diceArray
    }
    
    const [dice, setDice] = React.useState(allNewDice())
    
    function rollDice() {
        setDice(prevDice => prevDice.map(item => {
            return item.isHeld ? item : {
                value: Math.floor(Math.random() * 6 + 1),
                isHeld: false,
                id: nanoid()
            }
        }))
    }
    
    function holdDice(id) {
        setDice(prevDice => {
            return prevDice.map(item => {
                return item.id === id ? {
                    ...item, isHeld: !item.isHeld} : item
            })
        })
    }
    const diceElements = dice.map(item => 
    <Dice 
        value={item.value} 
        isHeld={item.isHeld} 
        key={item.id}
        handleClick={() => holdDice(item.id)} 
        />)
    
    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all the dice are the same. Click each dice to freeze it at its current value between rolls.</p>
            <div className="dice-container" >
                {diceElements}
            </div>
            <button type="button" className="button" onClick={rollDice}>Roll</button>
        </main>
    )
}