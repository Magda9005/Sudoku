import React from "react";
import { useState,useEffect } from "react";
import {prepareInitialBoard,changeBoardMedium,changeBoardHard,checkWholeBoard,colorSquares,findEmpty} from './index.js'
const arr =[
	4,9, 8, 2, 6, 3,1, 5, 7,
    1, 3,6,5,7,8,2,9,4,
    5,7,2,4,9,1,6,8,3,
    8,1,9,3,4,2,7,6,5,
    6,5,3,8,1,7,9,4,2,
    2,4,7,6,5,9,8,3,1,
    7,6,1,9,3,5,4,2,8,
    9,8,5,1,2,4,3,7,6,
    3,2,4,7,8,6,5,1,9]

let trKey=0;
let gameTime;
let id=0;

// modal which shows up when we press "pause button" on a stopwatch
function PauseModal({isStopped}){
    return(
      <>
           {isStopped && <div className="pause-modal">
            </div>} 
      </>
    )
  }


function Stopwatch({gameEnded,onPause,onStart}){
  const [time,setTime]=useState(0)
  const [isActive,setIsActive]=useState(true)


 if (gameEnded){
  gameTime= ("0"+Math.floor((time/60000)%60)).slice(-2)+":"+ ("0"+Math.floor((time/1000)%60)).slice(-2)
  }
  
useEffect(()=>{
  let interval=null;

  if(isActive) {
    interval=setInterval(()=>{
      setTime(prevTime=>prevTime+10)
    },10)
  } else {
    clearInterval(interval);
  } 
  return ()=> clearInterval(interval)
},[isActive])


    return (
      <div className="timer">
        <span>{("0"+Math.floor((time/60000)%60)).slice(-2)
}:</span>
        <span>{("0"+Math.floor((time/1000)%60)).slice(-2)
}</span>
       {!isActive? <button className="play-btn" onClick={()=>{
         setIsActive(true);
         onStart()
       }}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
       <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
       <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
     </svg></button>:<button className="stop-btn" onClick={()=>{
        setIsActive(false);
        onPause()
       }}> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
       </svg></button> }
       </div>
    )}


    function Rows({board,handleChange,isDefault}){
      // to put color on all fields containing selectedValue
      const [selectedValue,setSelectedValue]=useState(null)
      // to put color on rows/columns/squares
      const [selectedIndex,setSelectedIndex]=useState(undefined)

      function selected(value){
        if(value===selectedValue){
          return true
        }
      }

      function colorRows(firstCell,index,field){
        if(index>=firstCell && index<=firstCell+8){
          for (let i=0;i<9;i++){
            if(index-i===field && field>=firstCell && field<=firstCell+8|| index+i===field && field>=firstCell && field<=firstCell+8){
                        return true
                      }
                    }
        }
      
      }

    function colorFields(j){
      for (let i=0;i<73;i+=9){
        if(selectedIndex-i===j ||selectedIndex+i===j ){
          return true
        }
        if(colorRows(i,selectedIndex,j)){
          return true
        }
        }
        if(colorSquares(0,selectedIndex,j) )  {
          return true
        }
        if(colorSquares(27,selectedIndex,j) )  {
          return true
        }
        if(colorSquares(54,selectedIndex,j) )  {
          return true
        }
       
    }
           const rows=[]
           for (let i=0;i<board.length;i+=9){
             const cells=[]
             for(let j=i; j<i+9;j++){
               cells.push(<td key={j} style={{backgroundColor: colorFields(j)? 'lightblue':undefined}}>{!isDefault(j)?<div className="field" onClick={()=>{
                setSelectedValue(board[j]);
                setSelectedIndex(j);
               }} style={{backgroundColor: selected(board[j])? 'lightgrey':undefined}}>{board[j]}</div>:<input type="number" pattern="[0-9]{1}"value={board[j]} 
               onChange={e=>{
                 handleChange(j,e.target.value);
                }}
              onInput={(e)=>{
                e.target.value = Math.max(0, parseInt(e.target.value,10) ).toString().slice(0,1)
              }
              }
               style={{backgroundColor: selected(board[j])? 'lightgrey':undefined}}
             onClick={()=>{
               setSelectedValue(board[j]);
               setSelectedIndex(j);
              }}
             />}</td>)
             }
             rows.push(<tr key={trKey}>{cells}</tr>)
             trKey++;
           }
           return rows
         }

// modal which shows up when the game is over
function Modal({isOpen,onClick}){

    return(
        <>
     {isOpen && <div className="modal">         
     <h2>Gratulacje! Rozwiązałeś sudoku</h2>
     <p> Twój czas to: {gameTime}</p>
     <button className="new-game-btn" onClick={onClick}>Nowa gra</button>
     </div>}  
     </>
    )
}

export function App() {
let arrCopy=[...arr]

const [board,setBoard]=useState(prepareInitialBoard(arrCopy))
const [pause,setPause]=useState(false)
const [empty,setEmpty]=useState(findEmpty(board))

const [time,setTime]=useState(0)
const [isActive,setIsActive]=useState(false)

function handleDefault(v){
        if(empty.includes(v)){
          return true
        }
      }

function onChange(index,value){
    setBoard(board.map((field,ind)=>{
        if(ind===index){
            let newNumber=parseInt(value)
            return newNumber
        } else {
            return field
        }
    }
    ))
   }

   function handleNewGame(){
    id++;
    let easy=[...arr]
    let b=prepareInitialBoard(easy)
    setBoard(b);
    setEmpty(findEmpty(b));
    setShowModal(false);
    setOverlayClass(null);
}


function handleStart(){
  setPause(false);
}

function handlePause(){
    setPause(true)
}


function handleChangeLevel(e){
  if (e.target.value==="medium"){
    let medium=[...arr]
    id++;
    let m=changeBoardMedium(medium)
    setBoard(m);
    setEmpty(findEmpty(m));
    setPause(false);
  return board;
}  else if (e.target.value==="hard"){
    let hard=[...arr]
    id++;
    let h=changeBoardHard(hard)
    setBoard(h);
    setEmpty(findEmpty(h));
    setPause(false);
    return board
} else if(e.target.value==="easy"){
   let easy=[...arr]
   id++;
   let es=prepareInitialBoard(easy)
   setBoard(es);
   setEmpty(findEmpty(es));
   setPause(false);
   return board
}
}


    return(
<>
<div className="container">
<div className={checkWholeBoard(board)? "overlay":undefined}></div>
<h1>Sudoku</h1>
    <div className="difficulty-timer-area">
        <div className="difficulty-level">
        <label>Poziom trudności: </label>
        <select onChange={e=>{handleChangeLevel(e)}}>
            <option value="easy">Łatwy </option>
            <option value="medium">Średni </option>
            <option value="hard">Trudny </option>
        </select>
        </div>
      <Stopwatch key={id}
      gameEnded={checkWholeBoard(board)} onPause={handlePause} onStart={handleStart}
      />
    </div>
    <div className="board">
      <PauseModal isStopped={pause} onPlay={()=>setPause(false)}/>
      <table>
    <tbody>
        <Rows board={board} handleChange={onChange}
        isDefault={handleDefault}
        />
    </tbody>
</table>
</div>
  </div>
  <Modal isOpen={checkWholeBoard(board)} onClick={handleNewGame}/>
</>
    )
}

