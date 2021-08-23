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

let CordX = Math.round(Math.random() * (visualViewport.width-tamanho)/10)*10, CordY = Math.round(Math.random() * (visualViewport.height-tamanho)/10)*10
let passo = 5
let square = document.getElementById('square')
document.body.addEventListener("keydown", ()=>{
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
            clearInterval(cc)
            break
    }
})


let speed = 0
let direction
const Esquerda = () =>{
    square.style.transform = "scaleX(1)"
    clearInterval(direction)
    direction = setInterval(()=>{
        CordX -= passo
        square.style.left = CordX + "px"
        verify()
    }, speed)
}

const Cima = () =>{
    square.style.transform = "rotate(90deg)"
    clearInterval(direction)
    direction = setInterval(()=>{
        CordY -= passo
        square.style.top = CordY + "px"
        verify()
    }, speed)
}

const Direita = () =>{
    square.style.transform = "scaleX(-1)"
    clearInterval(direction)
    direction = setInterval(()=>{
        CordX += passo
        square.style.left = CordX + "px"
        verify()
    }, speed)
}

const Baixo = () =>{
    square.style.transform = "rotate(-90deg)"
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
    if (tempo <= 10){
        time.style.color = "red"
    } else {
        time.style.color = "white"
    }
    if (((CordX+tamanho)>Number(food.style.left.replace('px','')) && (CordX)<Number(food.style.left.replace('px',''))+tamanho) && (CordY+tamanho)>Number(food.style.top.replace('px','')) && (CordY)<Number(food.style.top.replace('px',''))+tamanho){
        CordFood()
        tamanho -= 5
        passo += 2
        tempo += 1.5
    if (tempo > 0 && tamanho == 20){
        alert(`VOCÊ GANHOU! :DD`)
        document.location.reload();
    }
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
tempo = 15
const contagem = ()=>{
    cc = setInterval(()=>{
        tempo -= 0.1
        time.innerText = tempo.toFixed(1)+"s"
        if (tempo <= 0){
            alert('GAME OVER')
            document.location.reload();
        }
    },100)
}

const iniciar = ()=>{
    onload = CordFood,contagem()
    square.style.top = CordY+"px"
    square.style.left = CordX+"px"
}
iniciar()