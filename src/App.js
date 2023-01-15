import React from "react";
import Dice from "./components/Dice";
import "./style.css"
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"

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
    
    function newGame() {
        setDice(allNewDice())
        setTenzies(false)
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
    
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(function() {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            //console.log("You won!")
        }
    }, [dice])

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all the dice are the same. Click each dice to freeze it at its current value between rolls.</p>
            <div className="dice-container" >
                {diceElements}
            </div>
            {tenzies ? <button 
                            type="button" 
                            className="button" 
                            onClick={newGame}
                        >New Game</button> : 
                        <button 
                            type="button" 
                            className="button" 
                            onClick={rollDice}
                        >Roll</button>}
            {tenzies && <Confetti />}
        </main>
    )
}