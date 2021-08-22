/* Geração aleatoria de comida. */
let food = document.getElementById('food')
let tamanho = 150
let CordFoodX = 0
let CordFoodY = 0

let CordFood = ()=>{
    CordFoodX = Math.round(Math.random() * (visualViewport.width-tamanho)/10)*10
    CordFoodY = Math.round(Math.random() * (visualViewport.height-tamanho)/10)*10
    food.style.top = CordFoodY+"px"
    food.style.left = CordFoodX+"px"
}

/*Movimentação do personagem*/

let CordX = 0, CordY = 0
let passo = 10
let square = document.getElementById('square')
document.body.addEventListener("keydown", ()=>{
    contagem()
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


let speed = 0
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
    food.style.top = CordFoodY+Math.round(Math.random() * (tamanho - (-tamanho)) + -tamanho)+"px"
    food.style.left = CordFoodX+Math.round(Math.random() * (tamanho - (-tamanho)) + -tamanho)+"px"
    if (CordFoodY <= 0){CordFoodY += tamanho}
    if (CordFoodY >= visualViewport.height){CordFoodY -= tamanho}
    if (CordFoodX <= 0){CordFoodX += tamanho}
    if (CordFoodX >= visualViewport.width){CordFoodX -= tamanho}
    if (CordX >= (visualViewport.width-tamanho)){Esquerda()}
    if (CordX <= -1){Direita()}
    if (CordY >= (visualViewport.height-tamanho)){Cima()}
    if (CordY <= -1){Baixo()}
    if (((CordX+tamanho)>Number(food.style.left.replace('px','')) && (CordX)<Number(food.style.left.replace('px',''))+tamanho) && (CordY+tamanho)>Number(food.style.top.replace('px','')) && (CordY)<Number(food.style.top.replace('px',''))+tamanho){
        CordFood()
        tamanho -= 5
        passo += 2
    }

    /* Define tamanho do quadrado e dá comida. */
    food.style.width = tamanho+"px"
    food.style.height = tamanho+"px"
    square.style.width = tamanho+"px"
    square.style.height = tamanho+"px"
}

/* Conta o tempo */
let time = document.getElementById('time')
let tempo
const contagem = ()=>{
    tempo = 30
    cc = setInterval(()=>{
        tempo --
        time.innerText = tempo+"s"
        if (tempo <= 0){
            alert('GAME OVER')
            iniciar()
            clearInterval(direction)
            square.style.top = "0px"
            square.style.left = "0px"
            clearInterval(cc)
        }
    },1000)
}

const iniciar = ()=>{
    onload = CordFood,verify()
}
iniciar()