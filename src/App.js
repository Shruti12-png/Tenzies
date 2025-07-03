import React from 'react';
import './index.css';
import Die from './Die';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';

function App() {
  const [dice,setDice]= React.useState(allNewDice())
  const [tenzies,setTenzies]=React.useState(false)

  React.useEffect(()=>{
    let count=0;
    const val= dice[0].value
    for(let i=0;i<dice.length;i++){
      if(dice[i].isHeld && dice[i].value ===val){
        count++;
      }

    }
    if(count===dice.length){
      setTenzies(true)
      console.log("You won")
    }

  },[dice])
  
  function allNewDice(){
    const newDice=[]
    for(let i=0;i<10;i++){
      newDice.push({
        value: Math.ceil(Math.random()*6), 
        isHeld: false, 
        id:nanoid()})
    }
    return newDice
  }
  
  function rollDice(){
    if(!tenzies){
    setDice(prevDice =>
      prevDice.map(die =>{
        return die.isHeld? die: {...die,value: Math.ceil(Math.random()*6)}
      })
    )
  }
  else{
    setTenzies(false)
    setDice(allNewDice())
  }
  }

  function holdDice(id){
    setDice(prevDice =>
      prevDice.map(die => {
        return die.id === id
        ? { ...die, isHeld: !die.isHeld }  // toggle isHeld
        : die})
    )
  }

  const diceElements= dice.map(die => <Die value={die.value} key={die.id} isHeld={die.isHeld} holdDice={()=> holdDice(die.id)}/>)
  
  

  return (
    <main>
      {tenzies && <Confetti /> }
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll untill all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button 
      className="roll-Dice" 
      onClick={rollDice}>
        {tenzies? "New Game" : "Roll"}
      </button>
    </main>
  )
}

export default App;
