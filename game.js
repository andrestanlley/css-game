// Telas interativas :DD
let welcome = document.querySelector('div.welcome')
let gameover = document.querySelector('div.gameover')
let pause = document.querySelector('div.pause')
/* Tamanho da tela */
let telaX = visualViewport.width
let telaY = visualViewport.height
const atualizar = ()=>{
    document.location.reload();
}

// Iniciar funções no jogo.
const iniciar = ()=>{
    CordFood()
    square.style.top = CordY+"px"
    square.style.left = CordX+"px"
    square.style.visibility = "visible"
    food.style.visibility = "visible"
    cc = setInterval(()=>{contagem()},100)
    if (telaX < telaY){
        console.log('Mobile!')
        document.body.style.backgroundImage = "url('./img/background_mobile.jpg')"
    }
}


/* Geração aleatoria de comida. */
let food = document.getElementById('food')
let tamanho = (telaY*16)/100
let CordFoodX = 0
let CordFoodY = 0
let CordFood = ()=>{
    CordFoodX = Math.round(Math.random() * (telaX-tamanho)/10)*10
    CordFoodY = Math.round(Math.random() * (telaY-tamanho)/10)*10
    food.style.top = CordFoodY+"px"
    food.style.left = CordFoodX+"px"
}

/*Movimentação do personagem*/

let CordX = Math.round(Math.random() * (telaX-tamanho)/10)*10, CordY = Math.round(Math.random() * (telaY-tamanho)/10)*10
let passo = 5
let square = document.getElementById('square')
document.body.addEventListener("keydown", ()=>{
    console.info(event.keyCode)
    pause.style.visibility = "hidden"
    switch (event.keyCode){
        case 32:
            iniciar()
            welcome.style.visibility = "hidden"
            break
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
            pause.style.visibility = "visible"
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
    }, speed)
}

const Cima = () =>{
    square.style.transform = "rotate(90deg)"
    clearInterval(direction)
    direction = setInterval(()=>{
        CordY -= passo
        square.style.top = CordY + "px"
    }, speed)
}

const Direita = () =>{
    square.style.transform = "scaleX(-1)"
    clearInterval(direction)
    direction = setInterval(()=>{
        CordX += passo
        square.style.left = CordX + "px"
    }, speed)
}

const Baixo = () =>{
    square.style.transform = "rotate(-90deg)"
    clearInterval(direction)
    direction = setInterval(()=>{
        CordY += passo
        square.style.top = CordY + "px"
    }, speed)
}

/* Verificação de colisão ou transbordamento. */

let verify = ()=>{
    /* Define tamanho do quadrado e dá comida. */
    food.style.width = tamanho+"px"
    food.style.height = tamanho+"px"
    square.style.width = tamanho+"px"
    square.style.height = tamanho+"px"
    food.style.top = CordFoodY+Math.round(Math.random() * (tamanho - (-tamanho)) + -tamanho)+"px"
    food.style.left = CordFoodX+Math.round(Math.random() * (tamanho - (-tamanho)) + -tamanho)+"px"
    if (CordFoodY <= 0){CordFoodY += tamanho}
    if (CordFoodY >= telaY){CordFoodY -= tamanho}
    if (CordFoodX <= 0){CordFoodX += tamanho}
    if (CordFoodX >= telaX){CordFoodX -= tamanho}
    if (CordX >= (telaX-tamanho)){Esquerda()}
    if (CordX <= -1){Direita()}
    if (CordY >= (telaY-tamanho)){Cima()}
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
    if (tempo > 0 && tamanho < Math.round((telaY*16)/100)*14/100){
        alert(`VOCÊ GANHOU! :DD`)
    }
    }
}

/* Conta o tempo */
let time = document.getElementById('time')
let tempo
tempo = 15 //Define o tempo em segundos
const contagem = ()=>{
        tempo -= 0.1
        time.innerText = tempo.toFixed(1)+"s"
        verify()
        if (tempo <= 0){ // Configuração de Game Over
            gameover.style.visibility = "visible"
            clearInterval(direction)
            clearInterval(cc)
        }
}

