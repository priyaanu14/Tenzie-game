import React from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import "./App.css"
import Die from "../Die/Die"
import Timer from "../Timer/Timer"

export default function App(){

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    function generateNewDie(){
        return {
            id: nanoid(),
            value: Math.ceil( Math.random() * 6),
            isHeld: false
        }
    }

    function allNewDice(){
        let nums = []
        for(let i = 0; i < 10; i++){
            nums.push(generateNewDie())
        }
   
        return nums
    }

    function rollDice(){
        if(tenzies) {
            setDice(allNewDice())
            setTenzies(false)
        } else{
            setDice(oldDice =>  oldDice.map(die => {
                        return die.isHeld ? 
                        die :
                        generateNewDie()
                    }))
        }
    }

    function holdDice(id){
        setDice(oldDice => oldDice.map(die =>  {
            return die.id === id ? 
            {...die, isHeld : !die.isHeld} :
            die
           }))
    }

    React.useEffect(() => {
        if(dice.every(die => die.value === dice[0].value && die.isHeld )){
            setTenzies(true)
            console.log("You won!")
        }
    },[dice])

    const btnText = tenzies ? "New game" : "Roll" 

    return(
        <main>
            {tenzies && <Confetti  />}
            <Timer tenzies = {tenzies}/>
            <h1 className="title" >Tenzies</h1>
            {tenzies && <h2>You won!</h2>}
            {!tenzies && <p className="instructions">Roll until all dice are same. 
                  Click on each die to freeze it at its current value between rolls.</p>}
            <div className="container">
                {
                    dice.map((die) => <Die key ={die.id} value= {die.value} isHeld = {die.isHeld} hold={() => holdDice(die.id)}/>)
                }
            </div>
            <button className= "roll-dice" onClick={rollDice}>{btnText}</button>
        </main>
    )
}