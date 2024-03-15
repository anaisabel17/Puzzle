let matrix = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', ''],
]

let board = document.querySelector('.board'); //Seleccionamos la clase board del html

drawTokens()
addEventListeners()

function drawTokens(){
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
        let movement = nextMovement(actualPosition, emptyPosition)

        if(movement != 'noMove'){
            updateMatrix(token.innerText, actualPosition, emptyPosition)
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

/*function nextMovement(actualPosition, emptyPosition) {
    //Calculamos si se mueve para la izquierda, derecha, arriba o abajo
    if(actualPosition[1] == emptyPosition[1]){
        if(actualPosition[0]-emptyPosition[0] == -1){
            return 'down' 
        }else if(actualPosition[0]-emptyPosition[0] == 1){
            return 'up'
        }else{
            return 'noMove'
        }
    }else if(actualPosition[0] == emptyPosition[0]){
        if(actualPosition[1]-emptyPosition[1] == -1){
            return 'right'
        }else if(actualPosition[1]-emptyPosition[1] == 1){
            return 'left'
        }else{
            return 'noMove'
        }
    }else{
        return 'noMove'
    }
}
*/
//Refactorizamos la funcion anterior ya que no usamos los return

function nextMovement(actualPosition, emptyPosition) {
    if(actualPosition[1] == emptyPosition[1]){
        if(actualPosition[0]-emptyPosition[0] > 1  || actualPosition[0]-emptyPosition[0] < -1){
            return 'noMove'
        }    
    }else if(actualPosition[0] == emptyPosition[0]){
        if(actualPosition[1]-emptyPosition[1] > 1  || actualPosition[1]-emptyPosition[1] < -1){
            return 'noMove'
        }    
    }else{
        return 'noMove'
    }
}

function updateMatrix(element, actualPosition, emptyPosition){
    matrix[actualPosition[0]][actualPosition[1]] = ''
    matrix[emptyPosition[0]][emptyPosition[1]] = element

    console.log(matrix)
}