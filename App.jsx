import React from "react";
import { useState } from "react";
import {prepareInitialBoard,changeBoardMedium,changeBoardHard,checkWholeBoard,colorSquares} from './index.js'

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


    
    function Rows({board,handleChange}){
      const [selectedValue,setSelectedValue]=useState(null)
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
               cells.push(<td key={j} style={{backgroundColor: colorFields(j)? 'lightblue':undefined}} ><input type="number" value={board[j]}
               onChange={e=>handleChange(j,e.target.value)}
               style={{backgroundColor: selected(board[j])? 'lightgrey':undefined}}
             onClick={()=>{
               setSelectedValue(board[j]);
               setSelectedIndex(j);
              }}
             /></td>)
             }
             rows.push(<tr key={trKey}>{cells}</tr>)
             trKey++;
           }
           return rows
         }

function Modal({isOpen,onClick}){

    return(
        <>
     {isOpen && <div className="modal">         
     <h2>Gratulacje! Rozwiązałeś sudoku</h2>
     <p> Twój czas to: 00:00</p>
     <button className="new-game-btn" onClick={onClick}>Nowa gra</button>
     </div>}  
     </>
    )
}

export function App() {
 // inicjujemy planszę, która odpali się po załadowaniu strony, poziom łatwy
let arrCopy=[...arr]
const [board,setBoard]=useState(prepareInitialBoard(arrCopy))

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
    let easy=[...arr]
    setBoard(prepareInitialBoard(easy));
    setShowModal(false);
    setOverlayClass(null)
}

    return(
<>
<div className="container">
<div className={checkWholeBoard(board)? "overlay":undefined}></div>
<h1>Sudoku</h1>
    <div className="difficulty-timer-area">
        <div className="difficulty-level">
        <label>Poziom trudności: </label>
        <select onChange={e=>{
            if (e.target.value==="medium"){
                console.log('medium')
                let medium=[...arr]
              return  setBoard(changeBoardMedium(medium))
            }  else if (e.target.value==="hard"){
                console.log('hard')
                let hard=[...arr]
              return  setBoard(changeBoardHard(hard))         
            } else if(e.target.value==="easy"){
               console.log('easy')
               let easy=[...arr]
              return  setBoard(prepareInitialBoard(easy))
            }
        }}>
            <option value="easy">Łatwy </option>
            <option value="medium">Średni </option>
            <option value="hard">Trudny </option>
        </select>
        </div>
        <div className="timer">
       00:00<button className="stop-btn"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg></button>
        </div>
    </div>
<table>
    <tbody>
        <Rows board={board} handleChange={onChange} 
        // colorInputs={putColorOnInputs}
        />
    </tbody>
</table>
  </div>
  <Modal isOpen={checkWholeBoard(board)} onClick={handleNewGame}/>

</>
    )
}

// doiglic - usuwanie drugiej cyfry zeby dalo sie wpisac tylko jedną


// dla pętli i=0;i<7;i+=3    ->0,3,6 
 

// if(selectedIndex===i+10 && selectedIndex-10===j || selectedIndex+10===j ||  ){
//  return true
// }
// if(selectedIndex>=i && selectedIndex<i+2 || selectedIndex>=i+9 && selectedIndex<i+12 || selectedIndex>=i+18 && selectedIndex<i+21 && selectedIndex-8===j || selectedIndex+8===j || selectedIndex-10===j || selectedIndex+7===j){
//   return true
// }
// }

