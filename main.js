let matrix = shuffleMatrix()
let board = document.querySelector('.board'); //Seleccionamos la clase board del html

drawTokens()
addEventListeners()

function drawTokens(){
    board.innerHTML = '';
    matrix.forEach(row => row.forEach(element => {
        if(element == ''){
            board.innerHTML += `<div class='empty'>${element}</div>`
        }else{
            board.innerHTML += `<div class='token'>${element}</div>`
        }
    }))
}

function addEventListeners(){
    let tokens = document.querySelectorAll('.token') //Todos los elementos que tengan la clase token se van a guardar en la variable tokens
    //console.log(tokens)
    tokens.forEach(token => token.addEventListener('click', ()=>{
        
        let actualPosition = searchPosition(token.innerText)
        let emptyPosition = searchPosition('')
        let movement = canItMove(actualPosition, emptyPosition)

        if(movement != false){
            updateMatrix(token.innerText, actualPosition, emptyPosition)

            let result = compareMatrix()

            if(result === true){
                confetti({
                    particleCount: 150,
                    spread: 180
                });
            }

            drawTokens()
            addEventListeners()
        }
    }))//A cada ficha le agregamos un escuchador para cuando haga click
}

function searchPosition(element){
    let rowIndex = 0;
    let columIndex = 0;
    matrix.forEach((row, index) => {
            let rowElement = row.findIndex(item => item == element)
            if(rowElement !== -1){
                rowIndex = index
                columIndex = rowElement
            }
        })
        return [rowIndex, columIndex]
}

function canItMove(actualPosition, emptyPosition) {
    if(actualPosition[1] == emptyPosition[1]){
        if(actualPosition[0]-emptyPosition[0] > 1  || actualPosition[0]-emptyPosition[0] < -1){
            return false
        }    
    }else if(actualPosition[0] == emptyPosition[0]){
        if(actualPosition[1]-emptyPosition[1] > 1  || actualPosition[1]-emptyPosition[1] < -1){
            return false
        }    
    }else{
        return false
    }
}

function updateMatrix(element, actualPosition, emptyPosition){
    matrix[actualPosition[0]][actualPosition[1]] = ''
    matrix[emptyPosition[0]][emptyPosition[1]] = element
}

function compareMatrix(){
    let counter = 0;
    let finalMatrix = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', ''],
    ]

    matrix.forEach((row, indexRow) => {
        row.forEach((element, indexColum) => {
            if(element == finalMatrix[indexRow][indexColum]){
                counter++
            }
        })
    })
    if (counter == 9){
        return true
    }else{
        return false
    }
}

function shuffleMatrix(){
    let shuffleMatrix = [
        [],
        [],
        []
    ]
    let array = ['1', '2', '3', '4', '5', '6', '7', '8', ''];
    let shuffleArray = array.sort(()=> Math.random()-0.5)

    let column = 0;
    let row = 0;

    shuffleArray.forEach(element => {
        shuffleMatrix[row].push(element)
        if(column < 2){
            column++  
        }else{
            column = 0;
            row++
        }
    })
    return shuffleMatrix;
}

