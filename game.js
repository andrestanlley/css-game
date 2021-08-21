/* Geração aleatoria de comida. */
let food = document.getElementById('food')
let CordFood = ()=>{
    let CordFoodX = Math.round(Math.random() * (visualViewport.width-100)/10)*10
    let CordFoodY = Math.round(Math.random() * (visualViewport.height-100)/10)*10
    food.style.top = CordFoodY+"px"
    food.style.left = CordFoodX+"px"
}
CordFood()

/*Movimentação do personagem*/

let CordX = 0, CordY = 0
let passo = 10
let square = document.getElementById('square')
document.body.addEventListener("keydown", ()=>{
    console.info(event.keyCode)
    switch (event.keyCode){
        case 37: case 65:
            Esquerda()
            break
        case 38: case 87:
            Cima()
            break
        case 39: case 68:
            Direita()
            break
        case 40: case 83:
            Baixo()
            break
        case 27:
            clearInterval(direction)
            console.log('PAUSE!')
            break
    }
})

let speed = 1
let direction
const Esquerda = () =>{
    clearInterval(direction)
    direction = setInterval(()=>{
        CordX -= passo
        square.style.left = CordX + "px"
        verify()
    }, speed)
}

const Cima = () =>{
    clearInterval(direction)
    direction = setInterval(()=>{
        CordY -= passo
        square.style.top = CordY + "px"
        verify()
    }, speed)
}

const Direita = () =>{
    clearInterval(direction)
    direction = setInterval(()=>{
        CordX += passo
        square.style.left = CordX + "px"
        verify()
    }, speed)
}

const Baixo = () =>{
    clearInterval(direction)
    direction = setInterval(()=>{
        CordY += passo
        square.style.top = CordY + "px"
        verify()
    }, speed)
}

/* Verificação de colisão ou transbordamento. */

let verify = ()=>{
    food.style.top = (Number(food.style.top.replaceAll('px','')))+Math.random() * 50+"px"
    food.style.top = (Number(food.style.top.replaceAll('px','')))-Math.random() * 50+"px"
    food.style.left = (Number(food.style.left.replaceAll('px','')))+Math.random() * 50+"px"
    food.style.left = (Number(food.style.left.replaceAll('px','')))-Math.random() * 50+"px"
    console.log(food.style.top)
    if (CordX >= visualViewport.width){
            CordX = -100
        } else if (CordY >= visualViewport.height){
            CordY = -100
        }
    if (((CordX+100)>Number(food.style.left.replace('px','')) && (CordX)<Number(food.style.left.replace('px',''))+100) && (CordY+100)>Number(food.style.top.replace('px','')) && (CordY)<Number(food.style.top.replace('px',''))+100){
        console.log('COMEU!')
        CordFood()
    }
}
