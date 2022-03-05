const arr = [
	4,9, 8, 2, 6, 3,1, 5, 7,
    1, 3,6,5,7,8,2,9,4,
    5,7,2,4,9,1,6,8,3,
    8,1,9,3,4,2,7,6,5,
    6,5,3,8,1,7,9,4,2,
    2,4,7,6,5,9,8,3,1,
    7,6,1,9,3,5,4,2,8,
    9,8,5,1,2,4,3,7,6,
    3,2,4,7,8,6,5,1,9]

const board=[...arr]

function swapRows(board,firstRowIndex,secondRowIndex){
    for(let i=firstRowIndex;i<firstRowIndex+9;i++){
    
    if(firstRowIndex===secondRowIndex){
    return board;
    }
    else if(secondRowIndex===firstRowIndex+9){
    const x=board[i]
    board[i]=board[i+9]
    board[i+9]=x
    } 
    else if(secondRowIndex===firstRowIndex+18) {
    const x=board[i]
    board[i]=board[i+18]
    board[i+18]=x    
    }
    
    }
    return board
    }

  

// funkcja do swapowania 2 kolumn
function swapColumns(board,firstColumnIndex,secondColumnIndex){
    for (let i=firstColumnIndex;i<firstColumnIndex+73;i+=9){
        if(firstColumnIndex===secondColumnIndex){
        return board;
      }
     else if(secondColumnIndex===firstColumnIndex+1){
      const x=board[i]
      board[i]=board[i+1]
      board[i+1]=x
         } 
      else if(secondColumnIndex===firstColumnIndex+2) {
       const x=board[i]
      board[i]=board[i+2]
      board[i+2]=x    
         }
    }
  return board
  }

// mieszanie wszystkich rowsów
function mixAllRows(board){
 
    // będziemy mieszać pierwszy rząd kwadratów,wyznaczamy możliwe first i secondIndexy
    const firstRowInd0=[0,9]
    const secondRowInd0=[9,18]
    let chosenFirstIndex=firstRowInd0[Math.floor(Math.random()*2)]
    let chosenSecondIndex=secondRowInd0[Math.floor(Math.random()*2)]
    
    // wywolujemy funkcję do mieszania rowsow pierwszy raz
    swapRows(board,chosenFirstIndex,chosenSecondIndex)
    //   losujemy drugi raz first i secondIndex
      chosenFirstIndex=firstRowInd0[Math.floor(Math.random()*2)]
      chosenSecondIndex=secondRowInd0[Math.floor(Math.random()*2)]
    //   wywołujemy funkcję mieszającą rowsy drugi raz
      swapRows(board,chosenFirstIndex,chosenSecondIndex)
 
// mieszamy drugi rząd kwadratów
const firstRowInd27=[27,36]
const secondRowInd27=[36,45]
chosenFirstIndex=firstRowInd27[Math.floor(Math.random()*2)]
chosenSecondIndex=secondRowInd27[Math.floor(Math.random()*2)]  
swapRows(board,chosenFirstIndex,chosenSecondIndex)
chosenFirstIndex=firstRowInd27[Math.floor(Math.random()*2)]
chosenSecondIndex=secondRowInd27[Math.floor(Math.random()*2)]
swapRows(board,chosenFirstIndex,chosenSecondIndex)

// mieszamy ostatni rząd kwadratów
const firstRowInd54=[54,63]
const secondRowInd54=[63,72]
chosenFirstIndex=firstRowInd54[Math.floor(Math.random()*2)]
chosenSecondIndex=secondRowInd54[Math.floor(Math.random()*2)]  
swapRows(board,chosenFirstIndex,chosenSecondIndex)
chosenFirstIndex=firstRowInd54[Math.floor(Math.random()*2)]
chosenSecondIndex=secondRowInd54[Math.floor(Math.random()*2)]
swapRows(board,chosenFirstIndex,chosenSecondIndex)

      return board
    }
    

    // mieszanie wszystkich kolumn
    function mixAllColumns(board){
// będziemy mieszać pierwszą kolumne kwadratów,wyznaczamy możliwe first i secondIndexy
const firstColInd0=[0,1]
const secondColInd0=[1,2]
let chosenFirstColIndex=firstColInd0[Math.floor(Math.random()*2)]
let chosenSecondColIndex=secondColInd0[Math.floor(Math.random()*2)]

// wywolujemy funkcję do mieszania kolumn pierwszy raz
swapColumns(board,chosenFirstColIndex,chosenSecondColIndex)
//   losujemy drugi raz first i secondIndex
  chosenFirstColIndex=firstColInd0[Math.floor(Math.random()*2)]
 chosenSecondColIndex=secondColInd0[Math.floor(Math.random()*2)]
//   wywołujemy funkcję mieszającą kolumny drugi raz
  swapColumns(board,chosenFirstColIndex,chosenSecondColIndex)
//   mieszamy drugą kolumnę kwadratów
const firstColInd3=[3,4]
const secondColInd3=[4,5]
chosenFirstColIndex=firstColInd3[Math.floor(Math.random()*2)]
chosenSecondColIndex=secondColInd3[Math.floor(Math.random()*2)]
swapColumns(board,chosenFirstColIndex,chosenSecondColIndex)
chosenFirstColIndex=firstColInd3[Math.floor(Math.random()*2)]
chosenSecondColIndex=secondColInd3[Math.floor(Math.random()*2)]
swapColumns(board,chosenFirstColIndex,chosenSecondColIndex)


// mieszamy trzecią kolumnę kwadratów
const firstColInd6=[6,7]
const secondColInd6=[7,8]
chosenFirstColIndex=firstColInd6[Math.floor(Math.random()*2)]
chosenSecondColIndex=secondColInd6[Math.floor(Math.random()*2)]
swapColumns(board,chosenFirstColIndex,chosenSecondColIndex)
chosenFirstColIndex=firstColInd6[Math.floor(Math.random()*2)]
chosenSecondColIndex=secondColInd6[Math.floor(Math.random()*2)]
swapColumns(board,chosenFirstColIndex,chosenSecondColIndex)

return board
    }

// czyszczenie randomowych pól tablicy- jak będę robiła poziomy trudności to mogę dorobić czyszczenie większej ilości pól
    function clearRandomFieldsEasy(board){
        let indexesToBeCleared=[]
        for(let i=0;i<3;i++){
        let randomIndex=Math.floor(Math.random()*80)
        indexesToBeCleared.push(randomIndex)
        }
        
        for(let j=0;j<indexesToBeCleared.length;j++){
          board[indexesToBeCleared[j]]=""
        }
        return board
      }

      function clearRandomFieldsMedium(board){
        let indexesToBeCleared=[]
        for(let i=0;i<20;i++){
        let randomIndex=Math.floor(Math.random()*80)
        indexesToBeCleared.push(randomIndex)
        }
        
        for(let j=0;j<indexesToBeCleared.length;j++){
          board[indexesToBeCleared[j]]=""
        }
        return board
      }

      function clearRandomFieldsHard(board){
        let indexesToBeCleared=[]
        for(let i=0;i<56;i++){
        let randomIndex=Math.floor(Math.random()*80)
        indexesToBeCleared.push(randomIndex)
        }
        
        for(let j=0;j<indexesToBeCleared.length;j++){
          board[indexesToBeCleared[j]]=""
        }
        return board
      }

// miesza rowsy, kolumny i usuwa randomowo 62 pola 
 export   function prepareInitialBoard(board){
mixAllRows(board)
mixAllColumns(board)
clearRandomFieldsEasy(board)
return board
    }

    export   function changeBoardMedium(board){
      mixAllRows(board)
      mixAllColumns(board)
      clearRandomFieldsMedium(board)
      return board
          }

          export   function changeBoardHard(board){
            mixAllRows(board)
            mixAllColumns(board)
            clearRandomFieldsHard(board)
            return board
                }

function checkRow(board, row) {
	let usedNumbers = [];

	for (let i = row; i < row + 9; i++) {
		if (
			typeof board[i] !== "number" ||
			board[i] <= 0 ||
			board[i] > 9 ||
			usedNumbers.includes(board[i])
		) {
			return false;
		} else {
			usedNumbers.push(board[i]);
		}
	}
	return true;
}

function checkAllRows(board) {
	for (let i = 0; i < board.length; i += 9) {
		if (!checkRow(board, i)) {
			return false;
		}
	}
	return true;
}

function checkColumn(board, column) {
	let usedNumbers = [];

	for (let i = column; i < column + 73; i+=9) {
		if (
			typeof board[i] !== "number" ||
			board[i] <= 0 ||
			board[i] > 9 ||
			usedNumbers.includes(board[i])
		) {
			return false;
		} else {
			usedNumbers.push(board[i]);
		}
	}
	return true;
}


function checkAllColumns(board){
    for (let i = 0; i <9; i++) {
		if (!checkColumn(board, i)) {
			return false;
		}
	}
	return true;
}


// wystarczy sprawdzić czy się nie powtarzają liczby w kwardracie bo funkcja sprawdzająca rzędy i kolumny sprawdza już czy nie ma tam innych znaków niż cyfry od 1-9

function checkSingleSquare(board, index){
    let usedNumbers=[]
    for (let i=index;i<index+19;i+=9){
        if(usedNumbers.includes(board[i])){
            return false
        } else {
            usedNumbers.push(board[i])
        }
        if(usedNumbers.includes(board[i+1])){
            return false
        } else {
            usedNumbers.push(board[i+1])
        }
        if(usedNumbers.includes(board[i+2])){
            return false
        } else {
            usedNumbers.push(board[i+2])
        }
        
    }
    return true

}

function checkRowOfSquares(board,index){
    for (let i=index; i<index+7; i+=3){
        if(!checkSingleSquare(board,i)){
            return false
        }

    }
    return true
}

// function checkAllSquares(board){
//     for(let i=0;i<55;i+=27){
//         if(!checkRowOfSquares(board,i)){
//             return false
//         }
//     }
//     return true;
// }



export function checkWholeBoard(board){
    for (let i = 0; i <9; i++) {
		if (!checkColumn(board, i)) {
			return false;
		}
        if (!checkRow(board, i*9)) {
			return false;
		}
        
	}
// tutaj myślałam, żeby zmienić tak jak wyżej na i*27 ale nie działa 
    for(let i=0;i<55;i+=27){
                if(!checkRowOfSquares(board,i)){
                    return false
                }
            }

	return true;
}

export function colorSquares(index,selectedIndex,j){
  for (let i=index;i<index+7;i+=3){
    if(selectedIndex===i && j<i+21 && selectedIndex+10===j || selectedIndex===i && j<i+21 && selectedIndex+20===j||selectedIndex===i && j<i+21 && selectedIndex+11===j ||selectedIndex===i && j<i+21 && selectedIndex+19===j){
      return true
    }

    if(selectedIndex===i+1 && j<i+21 && selectedIndex+8===j || selectedIndex===i+1 && j<i+21 && selectedIndex+17===j||selectedIndex===i+1 && j<i+21 && selectedIndex+10===j ||selectedIndex===i+1 && j<i+21 && selectedIndex+19===j){
      return true
    }

    if(selectedIndex===i+2 && j<i+21 && selectedIndex+7===j || selectedIndex===i+2 && j<i+21 && selectedIndex+16===j||selectedIndex===i+2 && j<i+21 && selectedIndex+8===j ||selectedIndex===i+2 && j<i+21 && selectedIndex+17===j){
      return true
    }

    if(selectedIndex===i+10 && j<i+21 && selectedIndex-10===j || selectedIndex===i+10 && j<i+21 && selectedIndex+10===j ||selectedIndex===i+10 && j<i+21 && selectedIndex+8===j ||selectedIndex===i+10 && j<i+21 && selectedIndex-8===j ){
      return true
     }
   
    if(selectedIndex===i+9 && j<i+21 && selectedIndex+10===j ||selectedIndex===i+9 && j<i+21 && selectedIndex+11===j ||selectedIndex===i+9 && j<i+21 && selectedIndex-8===j ||selectedIndex===i+9 && j<i+21 &&selectedIndex-7===j){
      return true
    }

    if(selectedIndex===i+11 && j<i+21 && selectedIndex-10===j ||selectedIndex===i+11 && j<i+21 && selectedIndex-11===j||selectedIndex===i+11 && j<i+21 && selectedIndex+8===j||selectedIndex===i+11 && j<i+21 && selectedIndex+7===j){
      return true
    }

    if(selectedIndex===i+18 && j<i+21 && selectedIndex-8===j ||selectedIndex===i+18 && j<i+21 && selectedIndex-16===j||selectedIndex===i+18 && j<i+21 && selectedIndex-7===j||selectedIndex===i+18 && j<i+21 && selectedIndex-17===j){
      return true
    }

    if(selectedIndex===i+19 && j<i+21 && selectedIndex-10===j ||selectedIndex===i+19 && j<i+21 && selectedIndex-19===j||selectedIndex===i+19 && j<i+21 && selectedIndex-8===j||selectedIndex===i+19 && j<i+21 && selectedIndex-17===j){
      return true
    }

    if(selectedIndex===i+20 && j<i+21 && selectedIndex-10===j ||selectedIndex===i+20 && j<i+21 && selectedIndex-20===j||selectedIndex===i+20 && j<i+21 && selectedIndex-11===j||selectedIndex===i+20 && j<i+21 && selectedIndex-19===j){
      return true
    }

  }

}